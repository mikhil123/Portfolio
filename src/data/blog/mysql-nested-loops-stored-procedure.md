---
title: Nested loops in MySQL stored procedures
date: 2019-08-05
summary: Nested WHILE and LOOP examples, LEAVE and ITERATE, and how to avoid the NOT FOUND trap when nesting cursors.
tags: MySQL, SQL, Stored procedures
---

MySQL stored procedures do not have a `for` loop, but they have three loop types that cover the same ground: `WHILE`, `REPEAT` and `LOOP`. Nesting them works exactly as you would expect, with a few traps. This post walks through nested loops with examples you can paste into a MySQL client.

## The three loop types

- `WHILE condition DO ... END WHILE` checks the condition before each pass.
- `REPEAT ... UNTIL condition END REPEAT` checks it after each pass, so the body always runs once.
- `label: LOOP ... END LOOP label` runs until you call `LEAVE label`. You can skip to the next pass with `ITERATE label`.

## Nested WHILE loops

Here is a procedure that builds a multiplication table. The outer loop walks the rows, the inner loop walks the columns.

```sql
DELIMITER //

CREATE PROCEDURE build_multiplication_table(IN max_n INT)
BEGIN
  DECLARE i INT DEFAULT 1;
  DECLARE j INT;

  DROP TEMPORARY TABLE IF EXISTS mult_table;
  CREATE TEMPORARY TABLE mult_table (a INT, b INT, product INT);

  WHILE i <= max_n DO
    SET j = 1;                       -- reset the inner counter every time
    WHILE j <= max_n DO
      INSERT INTO mult_table VALUES (i, j, i * j);
      SET j = j + 1;
    END WHILE;
    SET i = i + 1;
  END WHILE;

  SELECT * FROM mult_table;
END //

DELIMITER ;

CALL build_multiplication_table(3);
```

The most common bug is forgetting `SET j = 1;` inside the outer loop. If you only set `j` once at the top, the inner loop runs fully on the first pass and never again.

`DELIMITER //` is a client command, not SQL. It lets the client send the whole procedure body, which contains semicolons, as one statement.

## Labeled LOOP with LEAVE and ITERATE

When you need to exit early or skip a pass, labeled loops are clearer than extra conditions.

```sql
DELIMITER //

CREATE PROCEDURE pairs_without_diagonal(IN max_n INT)
BEGIN
  DECLARE i INT DEFAULT 0;
  DECLARE j INT;

  DROP TEMPORARY TABLE IF EXISTS pairs;
  CREATE TEMPORARY TABLE pairs (a INT, b INT);

  outer_loop: LOOP
    SET i = i + 1;
    IF i > max_n THEN
      LEAVE outer_loop;
    END IF;

    SET j = 0;
    inner_loop: LOOP
      SET j = j + 1;
      IF j > max_n THEN
        LEAVE inner_loop;
      END IF;
      IF j = i THEN
        ITERATE inner_loop;          -- skip pairs like (2, 2)
      END IF;

      INSERT INTO pairs VALUES (i, j);
    END LOOP inner_loop;
  END LOOP outer_loop;

  SELECT * FROM pairs;
END //

DELIMITER ;
```

Increment the counter at the top of the loop, before `ITERATE`. If you increment at the bottom, an `ITERATE` jumps past it and you get an infinite loop.

## Nested cursors: the NOT FOUND trap

Cursors let you loop over query results. When you nest them, the classic problem is the `NOT FOUND` handler. A handler declared in the outer block also fires when the inner cursor runs out of rows, so your outer loop ends too early.

The fix is to put the inner cursor in its own `BEGIN ... END` block with its own handler and flag.

```sql
DELIMITER //

CREATE PROCEDURE totals_per_customer()
BEGIN
  DECLARE done_outer INT DEFAULT 0;
  DECLARE v_customer_id INT;
  DECLARE cur_customers CURSOR FOR SELECT id FROM customers;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done_outer = 1;

  DROP TEMPORARY TABLE IF EXISTS customer_totals;
  CREATE TEMPORARY TABLE customer_totals (customer_id INT, total DECIMAL(12,2));

  OPEN cur_customers;
  customer_loop: LOOP
    FETCH cur_customers INTO v_customer_id;
    IF done_outer = 1 THEN
      LEAVE customer_loop;
    END IF;

    -- inner block: its own variables, cursor and handler
    BEGIN
      DECLARE done_inner INT DEFAULT 0;
      DECLARE v_amount DECIMAL(10,2);
      DECLARE v_total DECIMAL(12,2) DEFAULT 0;
      DECLARE cur_orders CURSOR FOR
        SELECT amount FROM orders WHERE customer_id = v_customer_id;
      DECLARE CONTINUE HANDLER FOR NOT FOUND SET done_inner = 1;

      OPEN cur_orders;
      order_loop: LOOP
        FETCH cur_orders INTO v_amount;
        IF done_inner = 1 THEN
          LEAVE order_loop;
        END IF;
        SET v_total = v_total + v_amount;
      END LOOP order_loop;
      CLOSE cur_orders;

      INSERT INTO customer_totals VALUES (v_customer_id, v_total);
    END;
  END LOOP customer_loop;
  CLOSE cur_customers;

  SELECT * FROM customer_totals;
END //

DELIMITER ;
```

Rules to remember: declarations in a block must come in this order: variables, then cursors, then handlers. Every `OPEN` needs a matching `CLOSE`. Each cursor gets its own done flag.

## Do you really need a loop?

Loops in stored procedures process one row at a time, and that is slow compared to a single set-based statement. The cursor example above is just this query:

```sql
SELECT customer_id, SUM(amount) AS total
FROM orders
GROUP BY customer_id;
```

Use loops when the work for each row cannot be expressed in SQL, for example calling another procedure per row, or when each step depends on the previous one. If you can write it as a `JOIN`, `GROUP BY` or `INSERT ... SELECT`, do that first.

## Quick checklist

- Reset inner counters inside the outer loop.
- Increment counters before `ITERATE`.
- Use labels so `LEAVE` and `ITERATE` say exactly which loop they affect.
- Give each nested cursor its own `BEGIN ... END` block, handler and done flag.
- Try a set-based query before reaching for a loop.

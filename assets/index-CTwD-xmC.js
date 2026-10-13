const r=`---
title: Moving from Jenkins to Harness: a practical migration guide
date: 2026-10-12
summary: How Jenkins concepts map to Harness, a side-by-side Jenkinsfile and pipeline YAML, and a step-by-step migration plan with common gotchas.
tags: CI/CD, Jenkins, Harness, DevOps
---

If your team has run Jenkins for years, you probably have a pile of Jenkinsfiles, shared libraries, plugins, credentials and a few build agents that nobody wants to touch. Harness is a popular next step because it ships CI, CD, secrets, approvals and rollbacks in one platform, and pipelines are plain YAML. This post is a practical map of what changes when you move, so you can plan the migration instead of discovering it halfway through.

> The YAML below is trimmed to show the shape of a Harness pipeline. Field names and defaults change between versions, so check the current Harness docs before copying anything into production.

## Think in concepts, not in syntax

The biggest mistake is translating a Jenkinsfile line by line. Most Jenkins ideas have a Harness equivalent, but they live in different places.

| Jenkins | Harness |
| --- | --- |
| Jenkinsfile (Groovy) | Pipeline YAML (stages and steps) |
| Agent / node / label | Delegate, or Harness Cloud / Kubernetes build infrastructure |
| Credentials | Secrets (managed by Harness or your vault) |
| Plugins | Built-in steps, plugin steps, connectors |
| Shared library | Templates (step, stage or pipeline templates) |
| Build parameters | Runtime inputs and input sets |
| Multibranch pipeline, webhooks | Triggers with branch and event conditions |
| \`post { failure { ... } }\` | Failure strategies and conditional execution |
| Manual \`input\` step | Approval steps |

## A simple Jenkinsfile

Here is a typical Java service build: compile and test with Maven, build an image, then deploy.

\`\`\`groovy
pipeline {
  agent { label 'maven' }
  environment {
    IMAGE = 'registry.example.com/payments/account-updater'
  }
  stages {
    stage('Build and test') {
      steps { sh 'mvn -B clean verify' }
    }
    stage('Image') {
      steps {
        sh "docker build -t $IMAGE:$BUILD_NUMBER ."
        sh "docker push $IMAGE:$BUILD_NUMBER"
      }
    }
    stage('Deploy') {
      steps { sh "./deploy.sh $IMAGE:$BUILD_NUMBER" }
    }
  }
  post {
    failure { echo 'Build failed' }
  }
}
\`\`\`

## The same idea in Harness

The CI part becomes a stage of type \`CI\`. Instead of a node with a label, you pick the build infrastructure, and every step can run in its own container image.

\`\`\`yaml
pipeline:
  name: account-updater
  identifier: account_updater
  properties:
    ci:
      codebase:
        connectorRef: github_connector
        repoName: account-updater
        build: <+input>
  stages:
    - stage:
        name: Build and test
        identifier: build_and_test
        type: CI
        spec:
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Maven verify
                  identifier: maven_verify
                  spec:
                    connectorRef: docker_hub
                    image: maven:3.9-eclipse-temurin-17
                    shell: Sh
                    command: mvn -B clean verify
              - step:
                  type: BuildAndPushDockerRegistry
                  name: Build and push image
                  identifier: build_and_push
                  spec:
                    connectorRef: docker_hub
                    repo: payments/account-updater
                    tags:
                      - <+pipeline.sequenceId>
\`\`\`

Two things to notice. Credentials never appear in the file, because the registry and Git access come from **connectors** that reference secrets. And the build number you used as \`$BUILD_NUMBER\` is now an expression, \`<+pipeline.sequenceId>\`.

The deployment half is where Harness differs most. Rather than a \`deploy.sh\`, you describe a **service**, an **environment** and an **infrastructure definition**, choose a deployment strategy (rolling, blue-green or canary), and let Harness handle rollback if verification fails.

## A migration plan that works

1. **Inventory first.** List every Jenkins job, the plugins it uses, the credentials it reads and who triggers it. Many jobs turn out to be dead.
2. **Start with one low-risk service.** Pick a service with simple build steps and an easy rollback, and migrate it end to end.
3. **Set up connectors and secrets once.** Git, container registry, artifact repository and cluster connectors are reused by every pipeline.
4. **Install delegates close to your systems.** Delegates make outbound connections to Harness, so they need network access to your internal registries and clusters. Firewall rules are the most common source of "it works in Jenkins but not here".
5. **Turn shared libraries into templates.** If ten Jenkinsfiles call the same Groovy helper, build one step or stage template and reuse it.
6. **Run both in parallel for a while.** Keep the Jenkins job green until the Harness pipeline has produced a few good releases, then switch the trigger.
7. **Decommission deliberately.** Disable the Jenkins job, keep it for a release or two, then archive it.

## Gotchas worth knowing

- **Plugins without a one-to-one replacement.** Check each plugin. Many are covered by built-in steps, some by plugin steps, and a few mean running a script in a container.
- **Groovy logic.** Complex conditionals and loops in a Jenkinsfile do not carry over. Move logic into scripts in your repo and call them from a \`Run\` step, or use conditional execution.
- **Secrets scope.** Decide up front whether secrets live at the account, organization or project level, and who can use them.
- **Caching.** Maven and Docker layer caches are not automatic. Configure caching or your builds will feel slower than on a warm Jenkins agent.
- **Audit and compliance.** If you scan with tools such as Checkmarx, Black Duck or SonarQube, add them as steps so the checks stay part of the pipeline.

## Is it worth it?

Harness is a good fit when you want deployments, approvals and rollbacks managed in the same tool as your builds, and you are tired of maintaining Jenkins plugins and agents. If your Jenkins setup is small and stable, the migration may not pay for itself. Either way, treat it as a chance to delete old jobs and standardize your pipelines, not just move them.
`,i=`---
title: Nested loops in MySQL stored procedures
date: 2026-10-12
summary: Nested WHILE and LOOP examples, LEAVE and ITERATE, and how to avoid the NOT FOUND trap when nesting cursors.
tags: MySQL, SQL, Stored procedures
---

MySQL stored procedures do not have a \`for\` loop, but they have three loop types that cover the same ground: \`WHILE\`, \`REPEAT\` and \`LOOP\`. Nesting them works exactly as you would expect, with a few traps. This post walks through nested loops with examples you can paste into a MySQL client.

## The three loop types

- \`WHILE condition DO ... END WHILE\` checks the condition before each pass.
- \`REPEAT ... UNTIL condition END REPEAT\` checks it after each pass, so the body always runs once.
- \`label: LOOP ... END LOOP label\` runs until you call \`LEAVE label\`. You can skip to the next pass with \`ITERATE label\`.

## Nested WHILE loops

Here is a procedure that builds a multiplication table. The outer loop walks the rows, the inner loop walks the columns.

\`\`\`sql
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
\`\`\`

The most common bug is forgetting \`SET j = 1;\` inside the outer loop. If you only set \`j\` once at the top, the inner loop runs fully on the first pass and never again.

\`DELIMITER //\` is a client command, not SQL. It lets the client send the whole procedure body, which contains semicolons, as one statement.

## Labeled LOOP with LEAVE and ITERATE

When you need to exit early or skip a pass, labeled loops are clearer than extra conditions.

\`\`\`sql
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
\`\`\`

Increment the counter at the top of the loop, before \`ITERATE\`. If you increment at the bottom, an \`ITERATE\` jumps past it and you get an infinite loop.

## Nested cursors: the NOT FOUND trap

Cursors let you loop over query results. When you nest them, the classic problem is the \`NOT FOUND\` handler. A handler declared in the outer block also fires when the inner cursor runs out of rows, so your outer loop ends too early.

The fix is to put the inner cursor in its own \`BEGIN ... END\` block with its own handler and flag.

\`\`\`sql
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
\`\`\`

Rules to remember: declarations in a block must come in this order: variables, then cursors, then handlers. Every \`OPEN\` needs a matching \`CLOSE\`. Each cursor gets its own done flag.

## Do you really need a loop?

Loops in stored procedures process one row at a time, and that is slow compared to a single set-based statement. The cursor example above is just this query:

\`\`\`sql
SELECT customer_id, SUM(amount) AS total
FROM orders
GROUP BY customer_id;
\`\`\`

Use loops when the work for each row cannot be expressed in SQL, for example calling another procedure per row, or when each step depends on the previous one. If you can write it as a \`JOIN\`, \`GROUP BY\` or \`INSERT ... SELECT\`, do that first.

## Quick checklist

- Reset inner counters inside the outer loop.
- Increment counters before \`ITERATE\`.
- Use labels so \`LEAVE\` and \`ITERATE\` say exactly which loop they affect.
- Give each nested cursor its own \`BEGIN ... END\` block, handler and done flag.
- Try a set-based query before reaching for a loop.
`,l=Object.assign({"./jenkins-to-harness.md":r,"./mysql-nested-loops-stored-procedure.md":i}),c=(e,n)=>{const s=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(n);if(!s)return null;const t={};return s[1].split(/\r?\n/).forEach(o=>{const a=o.indexOf(":");a>0&&(t[o.slice(0,a).trim()]=o.slice(a+1).trim())}),!t.title||!t.date?null:{slug:e.replace(/^\.\//,"").replace(/\.md$/,""),title:t.title,date:t.date,summary:t.summary||"",tags:(t.tags||"").split(",").map(o=>o.trim()).filter(Boolean),body:s[2].trim()}},u=Object.entries(l).map(([e,n])=>c(e,n)).filter(Boolean).sort((e,n)=>n.date.localeCompare(e.date)||e.title.localeCompare(n.title)),d=e=>u.find(n=>n.slug===e),p=e=>Math.max(1,Math.round(e.split(/\s+/).length/200)),h=e=>new Date(`${e}T00:00:00`).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});export{h as f,d as g,u as p,p as r};

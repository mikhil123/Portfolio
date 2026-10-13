import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import routes from '../../data/routes';

// Sticky top navigation, displays routes defined in 'src/data/routes'
const Navigation = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        {routes.filter((l) => l.index).map((l) => (
          <Link key={l.label} to={l.path} className="nav-brand" onClick={close}>
            {l.label}
          </Link>
        ))}
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          <ul>
            {routes.filter((l) => !l.index).map((l) => (
              <li key={l.label}>
                <NavLink
                  to={l.path}
                  className={l.cta ? 'nav-cta' : ''}
                  activeClassName="is-active"
                  onClick={close}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;

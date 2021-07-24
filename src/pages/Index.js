import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/">Hi,  I&lsquo;m Mikhil </Link></h2>
          <p>
            A software engineer specializing in front and back end technologys.
          </p>
        </div>
      </header>
      <p> Welcome to my website. Please feel free to read more <Link to="/about">about me</Link>,
        or you can check out my {' '}
        <Link to="/resume">resume</Link>, {' '}
        <Link to="/projects">projects</Link> {' '}
        , {' '}
        or <Link to="/contact">contact</Link> me.
      </p>
      <p> </p>
    </article>
  </Main>
);

export default Index;

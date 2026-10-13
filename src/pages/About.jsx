import React from 'react';
import ReactMarkdown from 'react-markdown';

import Main from '../layouts/Main';
import markdown from '../data/about.md?raw';

const About = () => (
  <Main
    title="About"
    description="Learn about Mikhil Wankhede"
  >
    <article className="page" id="about">
      <header className="page-header">
        <p className="sticker">About</p>
        <h1 data-testid="heading">About Me</h1>
      </header>
      <div className="prose">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </article>
  </Main>
);

export default About;

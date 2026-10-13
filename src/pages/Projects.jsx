import React from 'react';

import Main from '../layouts/Main';

import Cell from '../components/Projects/Cell';
import data from '../data/projects';

const Projects = () => (
  <Main
    title="Projects"
    description="Learn about Mikhil Wankhede projects."
  >
    <article className="page" id="projects">
      <header className="page-header">
        <p className="sticker">Projects</p>
        <h1 data-testid="heading">Projects</h1>
      </header>
      <div className="project-grid">
        {data.map((project) => (
          <Cell
            data={project}
            key={project.title}
          />
        ))}
      </div>
    </article>
  </Main>
);

export default Projects;

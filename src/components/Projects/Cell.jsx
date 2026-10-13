import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ data }) => (
  <article className="card project-card">
    <header>
      <p className="sticker sticker-small">{data.subtitle}</p>
      <h3>{data.title}</h3>
    </header>
    <p>{data.desc}</p>
    {data.points.length > 0 && (
      <ul className="bullets">
        {data.points.map((p) => <li key={p}>{p}</li>)}
      </ul>
    )}
    <ul className="chips chips-small">
      {data.tags.map((t) => <li className="chip" key={t}>{t}</li>)}
    </ul>
    {data.link && (
      <a className="btn btn-dark" href={data.link} target="_blank" rel="noopener noreferrer">
        {data.linkLabel} &#8599;
      </a>
    )}
  </article>
);

Cell.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    link: PropTypes.string,
    linkLabel: PropTypes.string,
    desc: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Cell;

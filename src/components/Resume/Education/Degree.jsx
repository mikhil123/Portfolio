import React from 'react';
import PropTypes from 'prop-types';

const Degree = ({ data }) => (
  <article className="card">
    <span className="pill">{data.year}</span>
    <h3>{data.degree}</h3>
    <p className="muted"><a href={data.link}>{data.school}</a></p>
  </article>
);

Degree.propTypes = {
  data: PropTypes.shape({
    degree: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
};

export default Degree;

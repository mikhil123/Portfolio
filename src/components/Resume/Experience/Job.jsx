import React from 'react';
import PropTypes from 'prop-types';

const Job = ({ data }) => (
  <article className="timeline-item">
    <span className="timeline-dot" aria-hidden="true" />
    <div className="card">
      <header className="card-head">
        <div>
          <h3>{data.position}</h3>
          <p className="muted">
            {data.link ? <a href={data.link}>{data.company}</a> : data.company}
          </p>
        </div>
        <span className="pill">{data.daterange}</span>
      </header>
      <ul className="bullets">
        {data.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  </article>
);

Job.propTypes = {
  data: PropTypes.shape({
    link: PropTypes.string,
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    daterange: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Job;

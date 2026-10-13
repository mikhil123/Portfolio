import React from 'react';
import PropTypes from 'prop-types';

import Job from './Experience/Job';

const Experience = ({ data }) => (
  <section className="section" id="experience">
    <div className="section-head">
      <h2>Experience</h2>
    </div>
    <div className="timeline">
      {data.map((job) => (
        <Job
          data={job}
          key={job.company}
        />
      ))}
    </div>
  </section>
);

Experience.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    company: PropTypes.string,
    position: PropTypes.string,
    link: PropTypes.string,
    daterange: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.string),
  })),
};

Experience.defaultProps = {
  data: [],
};

export default Experience;

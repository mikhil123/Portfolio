import React from 'react';
import PropTypes from 'prop-types';

import Degree from './Education/Degree';

const Education = ({ data }) => (
  <section className="section" id="education">
    <div className="section-head">
      <h2>Education</h2>
    </div>
    <div className="card-grid">
      {data.map((degree) => (
        <Degree
          data={degree}
          key={degree.school}
        />
      ))}
    </div>
  </section>
);

Education.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    school: PropTypes.string,
    degree: PropTypes.string,
    link: PropTypes.string,
    year: PropTypes.number,
  })),
};

Education.defaultProps = {
  data: [],
};

export default Education;

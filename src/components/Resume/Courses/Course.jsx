import React from 'react';
import PropTypes from 'prop-types';

const Course = ({ data }) => {
  const body = (
    <>
      <span className="course-date">{data.number}</span>
      <span className="course-title">{data.title.trim()}</span>
      <span className="course-issuer">{data.university}</span>
    </>
  );

  return (
    <li className="course">
      {data.link ? (
        <a href={data.link} target="_blank" rel="noopener noreferrer">{body}</a>
      ) : (
        <div>{body}</div>
      )}
    </li>
  );
};

Course.propTypes = {
  data: PropTypes.shape({
    link: PropTypes.string,
    number: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    university: PropTypes.string,
  }).isRequired,
};

export default Course;

import React from 'react';
import PropTypes from 'prop-types';

import Course from './Courses/Course';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

// "December 2024" -> sortable number (Safari can't parse that with new Date)
const toSortable = (label) => {
  const [month, year] = label.trim().split(/\s+/);
  return Number(year) * 12 + MONTHS.indexOf(month);
};

// newest first
const getRows = (courses) => courses
  .slice()
  .sort((a, b) => toSortable(b.number) - toSortable(a.number))
  .map((course) => (
    <Course data={course} key={course.title} />
  ));

const Courses = ({ data }) => (
  <section className="section" id="certifications">
    <div className="section-head">
      <h2>Certifications &amp; Courses</h2>
    </div>
    <ul className="course-list">
      {getRows(data)}
    </ul>
  </section>
);

Courses.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    number: PropTypes.string,
    link: PropTypes.string,
    university: PropTypes.string,
  })),
};

Courses.defaultProps = {
  data: [],
};

export default Courses;

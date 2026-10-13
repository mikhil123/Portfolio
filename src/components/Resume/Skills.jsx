import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ALL = 'All';

const Dots = ({ level }) => (
  <span className="dots" role="img" aria-label={`${level} out of 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <i key={n} className={n <= level ? 'on' : ''} />
    ))}
  </span>
);

Dots.propTypes = {
  level: PropTypes.number.isRequired,
};

const Skills = ({ skills, groups }) => {
  const [active, setActive] = useState(ALL);

  const rows = skills
    .filter((s) => active === ALL || s.group === active)
    .slice()
    .sort((a, b) => b.competency - a.competency);

  return (
    <section className="section" id="skills">
      <div className="section-head">
        <h2>Skills</h2>
      </div>
      <div className="filters">
        {[ALL, ...groups].map((g) => (
          <button
            key={g}
            type="button"
            className={`filter ${active === g ? 'is-active' : ''}`}
            onClick={() => setActive(g)}
          >
            {g}
          </button>
        ))}
      </div>
      <ul className="skill-grid">
        {rows.map((s) => (
          <li className="skill" key={s.title}>
            <span className="skill-name">{s.title}</span>
            <Dots level={s.competency} />
          </li>
        ))}
      </ul>
    </section>
  );
};

Skills.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    competency: PropTypes.number,
    group: PropTypes.string,
  })),
  groups: PropTypes.arrayOf(PropTypes.string),
};

Skills.defaultProps = {
  skills: [],
  groups: [],
};

export default Skills;

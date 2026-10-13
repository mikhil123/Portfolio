import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import data from '../../data/contact';

const ContactIcons = ({ showLabels }) => (
  <ul className={`contact-icons ${showLabels ? 'with-labels' : ''}`}>
    {data.map((s) => (
      <li key={s.label}>
        <a href={s.link} aria-label={s.label} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={s.icon} />
          {showLabels && <span>{s.label}</span>}
        </a>
      </li>
    ))}
  </ul>
);

ContactIcons.propTypes = {
  showLabels: PropTypes.bool,
};

ContactIcons.defaultProps = {
  showLabels: false,
};

export default ContactIcons;

import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';
import DownloadResume from './DownloadResume';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} Mikhil Wankhede &middot; <Link to="/">mikhilwankhede.com</Link>
        {' '}&middot;{' '}
        <DownloadResume className="footer-link">Resume (PDF)</DownloadResume>
      </p>
      <ContactIcons />
    </div>
  </footer>
);

export default Footer;

import React from 'react';

import Main from '../layouts/Main';
import ContactIcons from '../components/Contact/ContactIcons';
import DownloadResume from '../components/Template/DownloadResume';

const EMAIL = 'mikhilwankhede19@gmail.com';

const Contact = () => (
  <Main
    title="Contact"
    description="Contact Mikhil Wankhede"
  >
    <article className="page" id="contact">
      <header className="page-header">
        <p className="sticker">Say hi</p>
        <h1 data-testid="heading">Contact</h1>
        <p className="lead">Feel free to get in touch. You can email me at:</p>
      </header>
      <div className="card contact-card">
        <a className="contact-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <ContactIcons showLabels />
        <DownloadResume className="btn btn-dark" />
      </div>
    </article>
  </Main>
);

export default Contact;

import React from 'react';

import Main from '../layouts/Main';
import DownloadResume from '../components/Template/DownloadResume';

import Education from '../components/Resume/Education';
import Experience from '../components/Resume/Experience';
import Skills from '../components/Resume/Skills';
import Courses from '../components/Resume/Courses';

import courses from '../data/resume/courses';
import degrees from '../data/resume/degrees';
import positions from '../data/resume/positions';
import { skills, groups } from '../data/resume/skills';

const sections = [
  'Experience',
  'Skills',
  'Education',
  'Certifications',
];

const Resume = () => (
  <Main
    title="Resume"
    description="Mikhil Wankhede Resume"
  >
    <article className="page" id="resume">
      <header className="page-header">
        <p className="sticker">Resume</p>
        <h1 data-testid="heading">Resume</h1>
        <div className="header-actions">
          <DownloadResume className="btn btn-dark">Download PDF</DownloadResume>
        </div>
        <nav className="anchor-nav" aria-label="Resume sections">
          {sections.map((sec) => (
            <a key={sec} href={`#${sec.toLowerCase()}`}>{sec}</a>
          ))}
        </nav>
      </header>
      <Experience data={positions} />
      <Skills skills={skills} groups={groups} />
      <Education data={degrees} />
      <Courses data={courses} />
    </article>
  </Main>
);

export default Resume;

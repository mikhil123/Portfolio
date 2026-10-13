import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import ContactIcons from '../components/Contact/ContactIcons';
import DownloadResume from '../components/Template/DownloadResume';
import PostCard from '../components/Blog/PostCard';
import positions from '../data/resume/positions';
import posts from '../data/blog';
import { skills } from '../data/resume/skills';

const { BASE_URL } = import.meta.env;

const CAREER_START = new Date('2018-09-01').getTime();
const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;
const years = Math.floor((Date.now() - CAREER_START) / MS_PER_YEAR);

const facts = [
  { value: `${years}+`, label: 'years in software' },
  { value: 'Java', label: 'core stack' },
  { value: 'M.Tech', label: 'NIT Calicut' },
];

const featured = [
  'Java', 'Spring Boot', 'Spring Security', 'Postgres', 'MySQL',
  'OpenShift', 'Docker', 'Amazon Web Services', 'Apache Spark',
].filter((t) => skills.some((s) => s.title === t));

const current = positions[0];

const Index = () => (
  <Main>
    <section className="hero" id="index">
      <div className="hero-photo">
        <img src={`${BASE_URL}images/me.jpg`} alt="Mikhil Wankhede" />
        <span className="hero-badge">AWS Certified Developer</span>
      </div>
      <div className="hero-text">
        <p className="sticker">Java &amp; Spring Boot engineer</p>
        <h1 data-testid="heading">
          Hi, I&apos;m <span className="hl">Mikhil.</span><br />I build the backend.
        </h1>
        <p className="hero-sub">
          Scalable services and databases for payments at {current.company}. A{' '}
          <a href="http://nitc.ac.in/">NIT Calicut</a> post-graduate in Information Security.
        </p>
        <div className="hero-actions">
          <Link to="/resume" className="btn btn-dark">View resume</Link>
          <Link to="/projects" className="btn btn-ghost">Projects &rarr;</Link>
          <DownloadResume className="btn btn-ghost" />
        </div>
        <ul className="facts">
          {facts.map((f) => (
            <li key={f.label}>
              <strong>{f.value}</strong>
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
        <ContactIcons />
      </div>
    </section>

    <section className="section">
      <div className="section-head">
        <h2>Right now</h2>
        <Link to="/resume" className="text-link">Full resume &rarr;</Link>
      </div>
      <article className="card tilt-l">
        <header className="card-head">
          <div>
            <h3>{current.position}</h3>
            <p className="muted">{current.company}</p>
          </div>
          <span className="pill">{current.daterange}</span>
        </header>
        <ul className="bullets">
          {current.points.slice(0, 3).map((p) => <li key={p}>{p}</li>)}
        </ul>
      </article>
    </section>

    <section className="section">
      <div className="section-head">
        <h2>Core tech</h2>
        <Link to="/resume#skills" className="text-link">All skills &rarr;</Link>
      </div>
      <ul className="chips">
        {featured.map((t) => <li className="chip chip-core" key={t}>{t}</li>)}
      </ul>
    </section>

    <section className="section">
      <div className="section-head">
        <h2>From the blog</h2>
        <Link to="/blog" className="text-link">All posts &rarr;</Link>
      </div>
      <div className="post-list">
        {posts.slice(0, 2).map((post) => <PostCard post={post} key={post.slug} />)}
      </div>
    </section>
  </Main>
);

export default Index;

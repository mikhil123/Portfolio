import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatDate, readingTime } from '../../data/blog';

const PostCard = ({ post }) => (
  <article className="card post-card">
    <p className="post-meta">
      {formatDate(post.date)} &middot; {readingTime(post.body)} min read
    </p>
    <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
    <p className="post-summary">{post.summary}</p>
    <ul className="chips chips-small">
      {post.tags.map((t) => <li className="chip" key={t}>{t}</li>)}
    </ul>
    <Link to={`/blog/${post.slug}`} className="text-link">Read post &rarr;</Link>
  </article>
);

PostCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCard;

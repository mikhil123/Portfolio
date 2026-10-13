import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Main from '../layouts/Main';
import NotFound from './NotFound';
import { getPost, formatDate, readingTime } from '../data/blog';

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) return <NotFound />;

  return (
    <Main title={post.title} description={post.summary}>
      <article className="page blog-post" id="blog-post">
        <Link to="/blog" className="text-link">&larr; All posts</Link>
        <header className="page-header">
          <p className="post-meta">
            {formatDate(post.date)} &middot; {readingTime(post.body)} min read
          </p>
          <h1 data-testid="heading">{post.title}</h1>
          <ul className="chips chips-small">
            {post.tags.map((t) => <li className="chip" key={t}>{t}</li>)}
          </ul>
        </header>
        <div className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </div>
      </article>
    </Main>
  );
};

export default BlogPost;

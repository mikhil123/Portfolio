import React from 'react';

import Main from '../layouts/Main';
import PostCard from '../components/Blog/PostCard';
import posts from '../data/blog';

const Blog = () => (
  <Main
    title="Blog"
    description="Notes on Java, Spring Boot, databases, CI/CD and DevOps by Mikhil Wankhede."
  >
    <article className="page" id="blog">
      <header className="page-header">
        <p className="sticker">Blog</p>
        <h1 data-testid="heading">Notes &amp; write-ups</h1>
        <p className="lead">Things I learn while building backend systems: Java, databases, CI/CD and DevOps.</p>
      </header>
      <div className="post-list">
        {posts.map((post) => <PostCard post={post} key={post.slug} />)}
      </div>
    </article>
  </Main>
);

export default Blog;

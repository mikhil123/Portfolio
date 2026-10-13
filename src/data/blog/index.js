/*
 * HOW TO ADD A NEW BLOG POST
 * Create ONE markdown file in this folder, e.g. my-new-post.md, that starts
 * with a front-matter block like this:
 *
 *   ---
 *   title: My new post
 *   date: 2026-11-01
 *   summary: One or two sentences shown on the blog list.
 *   tags: Java, Spring Boot
 *   ---
 *
 *   Your post here. Start headings at "##" (the title is shown automatically).
 *
 * The file name becomes the URL: my-new-post.md -> /blog/my-new-post.
 * Nothing else needs to be edited.
 */
const files = import.meta.glob('./*.md', { query: '?raw', import: 'default', eager: true });

const parse = (path, source) => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!match) return null;

  const meta = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  });
  if (!meta.title || !meta.date) return null;

  return {
    slug: path.replace(/^\.\//, '').replace(/\.md$/, ''),
    title: meta.title,
    date: meta.date,
    summary: meta.summary || '',
    tags: (meta.tags || '').split(',').map((t) => t.trim()).filter(Boolean),
    body: match[2].trim(),
  };
};

const posts = Object.entries(files)
  .map(([path, source]) => parse(path, source))
  .filter(Boolean)
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title)); // newest first

export const getPost = (slug) => posts.find((p) => p.slug === slug);

export const readingTime = (body) => Math.max(1, Math.round(body.split(/\s+/).length / 200));

export const formatDate = (iso) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export default posts;

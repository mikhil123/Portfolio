# Mikhil Wankhede - portfolio

Personal site built with React and [Vite](https://vite.dev). Hosted on GitHub Pages at https://mikhilwankhede.com.

Requires Node.js 18 or newer (20 recommended, see `.nvmrc`).

## Run locally

```bash
npm install
npm start      # dev server at http://localhost:3000
npm run build  # production build into ./build
npm test       # run the tests
```

## Where things live

| What | Where |
| --- | --- |
| Home, About, Resume, Projects, Blog, Contact pages | `src/pages/` |
| Experience, skills, degrees, certifications | `src/data/resume/` |
| Projects | `src/data/projects.js` |
| About text | `src/data/about.md` |
| Social links and email | `src/data/contact.js` |
| Navigation links | `src/data/routes.js` |
| Styling (colours, fonts) | `src/static/css/main.css` (see the variables at the top) |
| Resume PDF | `public/Mikhil_Wankhede_Resume.pdf` (replace the file to update the download) |

## Writing a blog post

Create **one** markdown file in `src/data/blog/`, for example `my-new-post.md`, that starts with a front-matter block:

```markdown
---
title: My new post
date: 2026-11-01
summary: One or two sentences shown on the blog list.
tags: Java, Spring Boot
---

Your post here. Start your headings at `##`; the title is shown automatically.
```

The file name becomes the URL (`my-new-post.md` becomes `/blog/my-new-post`). Code blocks with a language (` ```sql `, ` ```java `, ` ```yaml `) and tables are supported. Commit and deploy: the post appears on `/blog` (newest first) and the two latest posts show on the home page. Nothing else needs to be edited.

## Deploy

```bash
npm run deploy
```

`npm run build` also creates `build/404.html` (see `scripts/postbuild.mjs`) (a copy of `index.html`) so deep links such as `/blog/some-post` still work on GitHub Pages when the page is refreshed.

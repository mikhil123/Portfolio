// jest-dom adds custom matchers for asserting on DOM nodes (works with Vitest).
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import About from '../pages/About';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import Contact from '../pages/Contact';
import Index from '../pages/Index';
import NotFound from '../pages/NotFound';
import Projects from '../pages/Projects';
import Resume from '../pages/Resume';

const pages = [
  {
    route: '/',
    component: Index,
  },
  {
    route: '/about',
    component: About,
  },
  {
    route: '/projects',
    component: Projects,
  },
  {
    route: '/blog',
    component: Blog,
  },
  {
    route: '/contact',
    component: Contact,
  },
  {
    route: '/resume',
    component: Resume,
  },
];

// Adds router to Page context and allows us to navigate to the
// correct page. See:
// https://testing-library.com/docs/example-react-router/#reducing-boilerplate
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

test('Renders 404 Page Component', () => {
  renderWithRouter(<NotFound />);
  const linkElement = screen.getByText(/Page Not Found/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders a blog post', () => {
  window.scrollTo = () => {};
  renderWithRouter(
    <Route path="/blog/:slug" component={BlogPost} />,
    { route: '/blog/jenkins-to-harness' },
  );
  expect(screen.getByTestId('heading')).toBeInTheDocument();
});

const checkPageComponent = async (page) => {
  test(`Renders ${page.route} Component`, () => {
    window.scrollTo = () => {}; // TODO mock this later
    renderWithRouter(<page.component />, { route: page.route });
  });
};

pages.forEach((page) => checkPageComponent(page));

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Navigation from '../components/Template/Navigation';
import Footer from '../components/Template/Footer';
import ScrollToTop from '../components/Template/ScrollToTop';

const Main = (props) => (
  <HelmetProvider>
    <ScrollToTop />
    <Helmet titleTemplate="%s | Mikhil Wankhede" defaultTitle="Mikhil Wankhede | Java & Spring Boot Backend Engineer" defer={false}>
      {props.title && <title>{props.title}</title>}
      <meta name="description" content={props.description} />
    </Helmet>
    <div className="site">
      <Navigation />
      <main className="site-main">
        <div className="container">
          {props.children}
        </div>
      </main>
      <Footer />
    </div>
  </HelmetProvider>
);

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  title: PropTypes.string,
  description: PropTypes.string,
};

Main.defaultProps = {
  children: null,
  title: null,
  description: 'Mikhil Wankhede - backend software engineer (Java, Spring Boot) building scalable payment services at Worldpay by FIS.',
};

export default Main;

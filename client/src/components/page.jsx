import React from 'react';
import PropTypes from 'prop-types';
import { Router, Redirect } from '@reach/router';
import { Container, Row, Col } from 'react-bootstrap';
import Home from './home';
import Install from './install';
import Links from './links';
import Tools from './tools';
import Rules from './rules';
import About from './about';
import News from './news';
import './style.css';

const Page = props => {
  const { config } = props;

  return (
    <Container className="h-100">
      <Row className="h-100 flex-column-reverse flex-lg-row">
        <Col>
          <Router primary={false}>
            <News path="/" />
            <Home path="/time" />
            <News path="/news" />
            <Install path="/install" info={config.install} />
            <Tools path="/tools/*" />
            <Links path="/links" links={config.links} />
            <Rules path="/rules" list={config.rules} />
            <About path="/about" />
            {/* <Contact path="/contact" /> */}
          </Router>
        </Col>
      </Row>
    </Container>
  );
};

const ListWithUpdated = PropTypes.shape({
  updated: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.string),
});

Page.propTypes = {
  config: PropTypes.shape({
    install: PropTypes.shape({
      bootloader: PropTypes.string.isRequired,
      discord: PropTypes.string.isRequired,
      source1: PropTypes.string.isRequired,
      source2: PropTypes.string.isRequired,
    }),
    links: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        header: PropTypes.string,
        image: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    rules: PropTypes.shape({
      allowed: ListWithUpdated,
      disallowed: ListWithUpdated,
      discord: ListWithUpdated,
      rules: ListWithUpdated,
      terms: ListWithUpdated,
      yells: ListWithUpdated,
    }),
  }).isRequired,
};

export default Page;

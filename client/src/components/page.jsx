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
import Contact from './contact';
import './style.css';

const Page = props => {
  const { config } = props;

  return (
    <Container className="h-100">
      <Row className="h-100 flex-column-reverse flex-lg-row">
        <Col>
          <Router primary={false}>
            <Home path="/" posts={config.posts} />
            <Install path="/install" info={config.install} />
            <Tools path="/tools" />
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
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.string,
        data: PropTypes.string,
        message: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    rules: PropTypes.shape({
      allowed: PropTypes.arrayOf(PropTypes.string),
      disallowed: PropTypes.arrayOf(PropTypes.string),
      discord: PropTypes.arrayOf(PropTypes.string),
      rules: PropTypes.arrayOf(PropTypes.string),
      terms: PropTypes.arrayOf(PropTypes.string),
      yells: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
};

export default Page;

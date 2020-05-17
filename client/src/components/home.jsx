import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import Yells from './yellbox';
import News from './newsbox';

function Home(props) {
  const { posts } = props;

  return (
    <Container fluid>
      <Row className="min-vh-100" className="flex-column-reverse flex-lg-row">
        <Col>{posts && <News posts={posts} />}</Col>
        <Col xs={12} lg={5} className="mb-3 mb-lg-0">
          <Yells />
        </Col>
      </Row>
    </Container>
  );
}

Home.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string,
      data: PropTypes.string,
      message: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};

Home.defaultProps = {
  posts: [],
};

export default Home;

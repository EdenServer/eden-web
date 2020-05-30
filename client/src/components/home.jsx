import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import YellBox from './yellbox';
import News from './newsbox';

function Home(props) {
  const { posts } = props;

  return (
    <Row className="min-vh-100 flex-column-reverse flex-lg-row">
      <Col>{posts && <News posts={posts} />}</Col>
      <Col lg={4} className="mb-3 mb-lg-0">
        <YellBox />
      </Col>
    </Row>
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

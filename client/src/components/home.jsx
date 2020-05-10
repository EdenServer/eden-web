import React from 'react';
import PropTypes from 'prop-types';
import Yells from './yellbox';
import News from './newsbox';

function Home(props) {
  const { posts } = props;

  return (
    <div className="gm_home">
      <Yells />
      {posts && <News posts={posts} />}
    </div>
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

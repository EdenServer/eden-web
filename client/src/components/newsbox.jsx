import React from 'react';
import InfoDisplay from '../components/InfoDisplay';
import Card from 'react-bootstrap/Card';

const News = ({ posts }) => (
  <ul>
    {posts.map((post, i) => (
      <div
        key={`news_${i}`}
        className={i === 0 || i === posts.length - 1 ? '' : 'my-3'}
      >
        <InfoDisplay
          header={<h2>{post.title}</h2>}
          as="li"
          footer={
            <span>
              {new Date(post.date).toLocaleString()} by {post.author}
            </span>
          }
        >
          <Card.Text className="text-justify">{post.message}</Card.Text>
        </InfoDisplay>
      </div>
    ))}
  </ul>
);

export default News;

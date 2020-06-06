import React from 'react';
import InfoDisplay from '../components/InfoDisplay';
import Card from 'react-bootstrap/Card';
import ReactMarkdown from 'react-markdown';

const News = ({ posts }) => (
  <>
    {posts.map((post, i) => (
      <div
        key={`news_${i}`}
        className={i === 0 || i === posts.length - 1 ? '' : 'my-3'}
      >
        <InfoDisplay
          title={post.title}
          footer={
            <span>
              {new Date(post.date).toLocaleString()} by {post.author}
            </span>
          }
        >
          <Card.Text className="text-justify">
            <ReactMarkdown source={post.message} />
          </Card.Text>
        </InfoDisplay>
      </div>
    ))}
  </>
);

export default News;

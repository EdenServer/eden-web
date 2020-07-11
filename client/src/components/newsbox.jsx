import React from 'react';
import InfoDisplay from '../components/InfoDisplay';
import Card from 'react-bootstrap/Card';
import ReactMarkdown from 'react-markdown';
import apiUtil from '../apiUtil';

const News = () => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    apiUtil.get(
      {
        url: `/api/v1/misc/news`,
        json: true,
      },
      (error, data) => {
        if (!error) {
          setPosts(data);
        }
      }
    );
  }, []);

  return (
    <>
      {posts.map(({ metadata, content }, i) => (
        <div
          key={`news_${i}`}
          className={i === 0 || i === posts.length - 1 ? '' : 'my-3'}
        >
          <InfoDisplay
            title={metadata.title}
            footer={
              <span>
                {new Date(metadata.date).toLocaleString()} by {metadata.author}
              </span>
            }
          >
            <Card.Text className="text-justify">
              <ReactMarkdown source={content} />
            </Card.Text>
          </InfoDisplay>
        </div>
      ))}
    </>
  );
};

export default News;

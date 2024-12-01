import React, { useMemo, useState } from 'react';
import JWTReader from 'jwt-client';
import Card from 'react-bootstrap/Card';
import ReactMarkdown from 'react-markdown';
import { Button } from 'semantic-ui-react';
import apiUtil from '../apiUtil';
import InfoDisplay from './InfoDisplay';

function Trash({ id }) {
  const [isConfirming, setIsConfirming] = useState(false);
  return isConfirming ? (
    <>
      <Button
        compact
        color="red"
        onClick={async () => {
          await apiUtil.post(
            {
              url: '/api/v1/misc/trash',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: { id },
            },
            (error, res) => {
              if (!error && res.status === 200) {
                alert('Post deleted!');
              } else {
                alert('Unable to delete.');
              }
            }
          );
          setIsConfirming(false);
        }}
      >
        Delete
      </Button>
      <Button
        compact
        onClick={() => {
          setIsConfirming(false);
        }}
      >
        Go back
      </Button>
    </>
  ) : (
    <Button color="red" compact icon="trash" onClick={() => setIsConfirming(true)} />
  );
}

const News = () => {
  const jwt = localStorage.getItem('jwt');
  const canPost = useMemo(() => (jwt != null ? (JWTReader.read(jwt)?.claim?.privileges ?? []).includes('WEB_SCRIBE') : false), [jwt]);
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
        <div key={`news_${metadata.date}`} className={i === 0 || i === posts.length - 1 ? '' : 'my-3'}>
          <InfoDisplay
            title={metadata.title}
            footer={
              <span style={{ alignItems: 'center', display: 'inline-flex', gap: 8 }}>
                {new Date(metadata.date).toLocaleString()} by {metadata.author}
                {canPost && <Trash id={metadata.id} />}
              </span>
            }
          >
            <Card.Text className="text-justify">
              <ReactMarkdown>{content}</ReactMarkdown>
            </Card.Text>
          </InfoDisplay>
        </div>
      ))}
    </>
  );
};

export default News;

import React from 'react';
import { DatePicker, Input, Row } from 'antd';
import { Button, Segment, Label } from 'semantic-ui-react';
import SimpleMDE from 'react-simplemde-editor';
import apiUtil from '../../apiUtil';

function toTimestamp(isoString) {
  return isoString.slice(0, 19).replace('T', ' ');
}

function Admin() {
  const [author, setAuthor] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [markdown, setMarkdown] = React.useState('');
  const [date, setDate] = React.useState(null);
  const [expiration, setExpiration] = React.useState(null);

  return (
    <Segment>
      <Row gutter={[8, 8]}>
        <Label>New post</Label>
        <Input placeholder="author" value={author} onChange={e => setAuthor(e.target.value)} size="large" />
        <Input placeholder="title" value={title} onChange={e => setTitle(e.target.value)} size="large" />
        <div style={{ width: '100%' }}>
          <SimpleMDE value={markdown} onChange={setMarkdown} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            primary
            onClick={async () => {
              await apiUtil.post(
                {
                  url: '/api/v1/misc/write',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: {
                    author,
                    title,
                    markdown,
                    date: toTimestamp(date != null ? date.toISOString() : new Date().toISOString()),
                    expiration: expiration != null ? toTimestamp(expiration.toISOString()) : null,
                  },
                },
                (error, res) => {
                  if (!error && res.status === 200) {
                    alert('Post created!');
                    setAuthor('');
                    setTitle('');
                    setMarkdown('');
                    setDate(null);
                    setExpiration(null);
                  } else {
                    alert('Unable to post.');
                  }
                }
              );
            }}
          >
            Post
          </Button>
          <DatePicker placeholder="start date" value={date} onChange={setDate} />
          <DatePicker placeholder="expiration" value={expiration} onChange={setExpiration} />
        </div>
      </Row>
    </Segment>
  );
}

export default Admin;

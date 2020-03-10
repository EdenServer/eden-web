import React from 'react';
import { Message } from 'semantic-ui-react';

const News = ({ posts }) => (
    <ul className="gm_news-container">
        {posts.map((post, i) => (
            <Message className="gm_news-post" as="li" key={`news_${i}`}>
                <Message.Header>
                    <h3 className="gm_news-title">{post.title}</h3>
                    <p className="gm_news-date">{(new Date(post.date).toLocaleString())} by {post.author}</p>
                </Message.Header>
                {post.message}
            </Message>
        ))}
    </ul>
);

export default News;

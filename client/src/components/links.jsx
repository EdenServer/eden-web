import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default ({ links }) => (
    <Card.Group className="gm_links" centered itemsPerRow={3}>
        {links.map(link => (
            <Card href={link.url}>
                <Card.Content>
                    {link.image && <Image floated="right" size="mini" src={link.image} />}
                    <Card.Header>{link.header}</Card.Header>
                    <Card.Description>{link.description}</Card.Description>
                </Card.Content>
            </Card>
        ))}
    </Card.Group>
);

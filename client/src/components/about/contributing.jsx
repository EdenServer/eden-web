import React, { useState, useEffect } from 'react';
import { Card, Nav } from 'react-bootstrap';
import Setup from './setup';

function Contributing() {
  const setupContent = () => <Setup />;
  const writingBcnmsContent = () => (
    <p>&quot;Writing BCNMs&quot; coming soon...</p>
  );
  const edenDocsContent = () => <p>&quot;Eden Docs&quot; coming soon...</p>;

  const [activeKey, setActiveKey] = useState('setup');
  const [activeContent, setActiveContent] = useState(setupContent);

  useEffect(() => {
    switch (activeKey) {
      case 'setup':
        setActiveContent(setupContent());
        break;
      case 'bcnms':
        setActiveContent(writingBcnmsContent());
        break;
      case 'docs':
        setActiveContent(edenDocsContent());
        break;
      default:
        setActiveContent('');
    }
  }, [activeKey]);

  return (
    <Card bg="light" className="m-3">
      <Card.Header>
        <Nav
          variant="Tabs"
          onSelect={k => setActiveKey(k)}
          activeKey={activeKey}
        >
          <Nav.Item>
            <Nav.Link eventKey="setup" href="#setting-up-dsp">
              Setting up DSP
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="bcnms" href="#writing-bcnms">
              Writing BCNMs
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="docs" href="#eden-docs">
              Eden Docs
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>

      <Card.Body>{activeContent}</Card.Body>
    </Card>
  );
}

export default Contributing;

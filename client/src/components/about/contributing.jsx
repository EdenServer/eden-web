import React, { useState, useEffect } from 'react';
import { Card, Nav } from 'react-bootstrap';
import Setup from './setup';

function Contributing() {
  const setupContent = () => <Setup />;
  const writingBcnmsContent = () => <p>Under development.</p>;
  const edenDocsContent = () => <p>Under development.</p>;

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
    <Card>
      <Card.Header>
        <Nav variant="Tabs" onSelect={k => setActiveKey(k)} activeKey={activeKey}>
          <Nav.Item>
            <Nav.Link eventKey="setup" href="#setting-up-dsp">
              Setting up DSP
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link disabled eventKey="bcnms" href="#writing-bcnms">
              Writing BCNMs
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link disabled eventKey="docs" href="#eden-docs">
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

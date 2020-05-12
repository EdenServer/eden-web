import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function InfoDisplay(props) {
  const { header, title, children } = props;

  return (
    <Card bg="light" className="m-3">
      {header && <Card.Header>{header}</Card.Header>}
      <Card.Body>
        {title && (
          <Card.Title>
            <h3>{title}</h3>
          </Card.Title>
        )}
        {children}
      </Card.Body>
    </Card>
  );
}

InfoDisplay.propTypes = {
  header: PropTypes.node,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

InfoDisplay.defaultProps = {
  header: null,
  title: '',
};

export default InfoDisplay;

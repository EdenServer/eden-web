import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function InfoDisplay(props) {
  const { title, children } = props;

  return (
    <Card bg="light" className="m-3">
      <Card.Body>
        <Card.Title>
          <h3>{title}</h3>
        </Card.Title>
        <Card.Text>{children}</Card.Text>
      </Card.Body>
    </Card>
  );
}

InfoDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default InfoDisplay;

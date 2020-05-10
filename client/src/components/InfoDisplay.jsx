import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function InfoDisplay(props) {
  const { title, children } = props;

  return (
    <Card bg="light" className="m-3">
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
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

InfoDisplay.defaultProps = {
  title: '',
};

export default InfoDisplay;

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function InfoDisplay(props) {
  const { title, children, footer } = props;

  return (
    <Card>
      {title && (
        <Card.Header>
          <h3>{title}</h3>
        </Card.Header>
      )}
      <Card.Body>{children}</Card.Body>
      {footer && (
        <Card.Footer className="text-muted text-right">{footer}</Card.Footer>
      )}
    </Card>
  );
}

InfoDisplay.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

InfoDisplay.defaultProps = {
  title: '',
  footer: null,
};

export default InfoDisplay;

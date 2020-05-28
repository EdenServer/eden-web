import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

function InfoDisplay(props) {
  const { header, title, children, footer } = props;

  return (
    <Card>
      {header && <Card.Header>{header}</Card.Header>}
      <Card.Body>
        {title && (
          <Card.Title>
            <h3>{title}</h3>
          </Card.Title>
        )}
        {children}
      </Card.Body>
      {footer && (
        <Card.Footer className="text-muted text-right">{footer}</Card.Footer>
      )}
    </Card>
  );
}

InfoDisplay.propTypes = {
  header: PropTypes.node,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

InfoDisplay.defaultProps = {
  header: null,
  title: "",
  footer: null,
};

export default InfoDisplay;

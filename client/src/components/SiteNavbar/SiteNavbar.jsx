import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavLink } from 'react-bootstrap';
import { Link } from '@reach/router';

const SiteNavbar = props => {
  const { links } = props;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/home">
        <span className="gm_banner_text">Eden</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          {links.map(link => (
            <NavLink as={Link} to={link.to} key={link.key}>
              {link.icon ? <i className="" /> : null} {link.text}
            </NavLink>
          ))}
        </Nav>
        {/* Other controls such as Login/Signup buttons could go here right-aligned */}
      </Navbar.Collapse>
    </Navbar>
  );
};

SiteNavbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string || PropTypes.number,
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SiteNavbar;

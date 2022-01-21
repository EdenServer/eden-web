import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavLink } from 'react-bootstrap';
import { Link } from '@reach/router';

const SiteNavbar = props => {
  const { links } = props;

  return (
    <Navbar className="gm_nav" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" className="navbar-brand-override">
        <span className="gm_banner_text">Eden</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          {links.map(link => (
            /* Links specified to be functions will provide the event as a parameter. This can be used to prevent the default click action. */
            <NavLink as={Link} to={link.to} key={link.key} onClick={link.type === 'function' ? action => link.func(action) : null} className="mr-3">
              {link.icon ? <span className="mr-1">{link.icon}</span> : null} {link.text}
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
      icon: PropTypes.node,
    })
  ).isRequired,
};

export default SiteNavbar;

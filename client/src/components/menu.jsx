import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

export default ({ active, selection, onClick }) => {
  if (!active) {
    return null;
  }

  return (
    <Menu className="gm_menu" vertical>
      <Menu.Item
        as={Link}
        to="/home"
        active={selection === '/home'}
        onClick={onClick}
      >
        News
        <Icon name="home" />
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/install"
        active={selection === '/install'}
        onClick={onClick}
      >
        Install
        <Icon name="computer" />
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/tools"
        active={selection === '/tools'}
        onClick={onClick}
      >
        Tools
        <Icon name="wrench" />
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/links"
        active={selection === '/links'}
        onClick={onClick}
      >
        Links
        <Icon name="linkify" />
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/rules"
        active={selection === '/rules'}
        onClick={onClick}
      >
        Rules
        <Icon name="gavel" />
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/about"
        active={selection === '/about'}
        onClick={onClick}
      >
        FAQ
        <Icon name="info" />
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/contact"
        active={selection === '/contact'}
        onClick={onClick}
      >
        Contact
        <Icon name="phone" />
      </Menu.Item>
      <Menu.Item className="gm_menu-credits">
        <div style={{ fontSize: '10px' }}>
          All FINAL FANTASY® XI content and images © 2002-2020 SQUARE ENIX CO.,
          LTD. All Rights Reserved.
        </div>
        <br />
        <div style={{ fontSize: '10px' }}>
          FINAL FANTASY® is a registered trademark of SQUARE ENIX CO., LTD. All
          Rights Reserved.
        </div>
      </Menu.Item>
    </Menu>
  );
};

import React from 'react';
import { Menu } from 'semantic-ui-react';
import Setup from './setup';

export default () => {
    const [tab, setTab] = React.useState(0);
    return (
        <React.Fragment>
            <Menu secondary pointing>
                <Menu.Item active={tab === 0} onClick={() => setTab(0)}>
                  Setting up DSP
                </Menu.Item>
                <Menu.Item disabled>
                  Writing BCNMs
                </Menu.Item>
                <Menu.Item disabled>
                  Eden Docs
                </Menu.Item>
            </Menu>
            {tab === 0 && <Setup />}
        </React.Fragment>
    );
}

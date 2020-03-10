import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Menu from './menu';
import Hamburger from './hamburger';
import Home from './home';
import Install from './install';
import Links from './links';
import Tools from './tools';
import Rules from './rules';
import About from './about';
import Contact from './contact';
import './style.css';

const Page = ({ location, config }) => {
    const [active, setActive] = React.useState(false);

    const changePage = (_e, data) => {
        localStorage.getItem('page', data.to);
        setActive(false);
    }

    return (
        <div className="gm_main">
            <div className="gm_banner">
                <Hamburger active={active} toggle={() => setActive(!active)} />
                <h2 className="gm_banner_text">Eden</h2>
            </div>
            <Menu active={active} selection={location.pathname} onClick={changePage} />
            <Switch>
                <Route exact path="/install" render={props => <Install info={config.install} {...props} />} />
                <Route exact path="/tools" render={props => <Tools {...props} />} />
                <Route exact path="/links" render={props => <Links links={config.links} {...props} />} />
                <Route exact path="/rules" render={props => <Rules list={config.rules} {...props} />} />
                <Route exact path="/about" render={About} />
                <Route exact path="/home" render={props => <Home posts={config.posts} {...props} />} />
                <Route exact path="/contact" render={() => <Contact />} />
                <Redirect from="/" to={localStorage.getItem('page') || '/home' } />
            </Switch>
        </div>
    );
};

export default withRouter(Page);

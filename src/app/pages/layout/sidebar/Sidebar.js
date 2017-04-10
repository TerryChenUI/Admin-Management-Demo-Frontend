import React from 'react';
import SiteTitle from './title/SiteTitle';
import Profile from './profile/Profile';
import NavBar from './menu/NavBar';
import FooterAction from './footer/FooterAction';

import './sidebar.scss';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-3 left_col menu_fixed">
                <div className="left_col scroll-view">
                    <SiteTitle/>
                    <div className="clearfix"/>
                    <Profile/>
                    <NavBar location={this.props.location}/>
                    <FooterAction/>
                </div>
            </div>
        );
    }
}

export default Sidebar;
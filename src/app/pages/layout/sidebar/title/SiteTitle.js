import React from 'react';
import './SiteTitle.scss';

export default class SideTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar nav_title" style={{ border: 0 }}>
                <a href="index.html" className="site_title"><i className="fa fa-paw"></i> <span>React Admin</span></a>
            </div>
        );
    }
}
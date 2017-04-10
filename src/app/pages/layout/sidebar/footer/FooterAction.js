import React from 'react';
import "./Footer.scss";

export default class FooterAction extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar-footer hidden-small">
                <a href="" data-toggle="tooltip" data-placement="top" title="Settings">
                    <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
                </a>
                <a href="" data-toggle="tooltip" data-placement="top" title="FullScreen">
                    <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
                </a>
                <a href="" data-toggle="tooltip" data-placement="top" title="Lock">
                    <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                </a>
                <a href="" data-toggle="tooltip" data-placement="top" title="Logout">
                    <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
                </a>
            </div>
        );
    }
}
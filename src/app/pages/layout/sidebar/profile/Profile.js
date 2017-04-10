import React from 'react';
import './Profile.scss';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="profile">
                <div className="profile_pic">
                    <img src="images/img.jpg" alt="..." className="img-circle profile_img"/>
                </div>
                <div className="profile_info">
                    <span>欢迎你,</span>
                    <h2>管理员</h2>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}
import React from 'react'
import { Menu, Icon, Popover } from 'antd'
import './Header.scss'

const SubMenu = Menu.SubMenu;

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const siderFold = false;
        return (
            <div className="header">
                <div className="button">
                    <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
                </div>
                <div className="right-wrapper">
                    <div className="button"><Icon type="mail" /></div>
                    <Menu mode="horizontal">
                        <SubMenu title={<span><Icon type="user" />admin</span>}>
                            <Menu.Item key="logout">
                                Sign out
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        );
    }
}

export default Header;
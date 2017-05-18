import React from 'react'
import { Link } from 'react-router'
import { Breadcrumb, Icon } from 'antd'
import './Bread.scss'

class Bread extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bread">
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                        <Icon type="laptop" style={{ marginRight: 4 }}/>
                        DashBoard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                        <Icon type="user" style={{ marginRight: 4 }}/>
                        <span>Application List</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Application
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );
    }
}

export default Bread;
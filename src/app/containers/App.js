import React from 'react'

import Sider from './Layout/Sider'
import Header from './Layout/Header'
import Bread from './Layout/Bread'
import Footer from './Layout/Footer'

import 'antd/dist/antd.css'
import './App.scss'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layout">
                <Sider></Sider>
                <div className="main">
                    <Header></Header>
                    <Bread></Bread>
                    <div className="container">
                        <div className="conntent">
                            {this.props.children}
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}

export default App;
import React from 'react';

import Sidebar from './layout/sidebar/Sidebar';
import Header from './layout/header/Header';
import Footer from './layout/footer/Footer';

import './app.scss';
import './table.scss';
import './form.scss';
import './iconts-display.scss';
import './button.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container body">
                <div className="main_container">
                    <Sidebar location={this.props.location}></Sidebar>
                    <Header></Header>
                    {this.props.children}
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}

export default App;
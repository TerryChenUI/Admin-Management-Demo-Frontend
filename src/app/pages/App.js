import React from 'react';

import Sidebar from './layout/sidebar/Sidebar';
import Header from './layout/header/Header';
import Footer from './layout/footer/Footer';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container body">
                <Header></Header>
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar></Sidebar>
                        {this.props.children}
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default App;
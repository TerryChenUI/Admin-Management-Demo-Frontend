import React from 'react';
import { connect } from 'react-redux';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="right_col" role="main">
                {this.props.children}
            </div>
        );
    }
}

export default Main;
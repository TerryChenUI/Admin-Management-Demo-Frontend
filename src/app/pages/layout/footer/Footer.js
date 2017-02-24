import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer>
                <div className="pull-right">
                    React Redux Crud Demo for bootstrap.
                </div>
                <div className="clearfix"></div>
            </footer>
        );
    }
}

export default Footer;
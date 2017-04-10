import React from 'react';
import './Footer.scss';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer>
                <div className="pull-right">
                    Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>
                </div>
                <div className="clearfix"></div>
            </footer>
        );
    }
}

export default Footer;
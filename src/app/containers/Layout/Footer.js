import React from 'react'
import './Footer.scss'

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="footer">
                Ant Design Admin © 2017 Terry Chen
            </footer>
        );
    }
}

export default Footer;
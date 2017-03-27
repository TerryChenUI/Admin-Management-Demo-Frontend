import React from 'react';
import './Table.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        data: [],
    };

    static propTypes = {
        data: React.PropTypes.array
    };

    render() {
        return this.props.data.map(col => {
            return (
                <th className={col.className} key={col.key} width={col.width}>{col.title}</th>
            );
        })
    }
}

export default Header;
import React from 'react';
import './Table.css';

class Column extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        // dataSource: [],
    };

    static propTypes = {
        title: React.PropTypes.string,
        key: React.PropTypes.string,
        dataIndex: React.PropTypes.string,
        render: React.PropTypes.func
    };

    render() {
        const {key, title, dataIndex, render} = this.props;
        return (
            <td key={key}>
                {render ? render(col.dataIndex) : row[col.dataIndex]}
            </td>
        );
    }
}

export default Column;
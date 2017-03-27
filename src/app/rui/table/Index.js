import React, { Component, PropTypes } from 'react';
import './style.css';

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        dataSource: [],
        columns: [],
        loading: false
    };

    static propTypes = {
        dataSource: PropTypes.array,
        columns: PropTypes.array,
        loading: PropTypes.bool
    };

    renderHeader(columns) {
        return columns.map(col => {
            return (
                <th key={col.key} width={col.width}>{col.title}</th>
            );
        })
    }

    renderBody(columns, data) {
        return data.map((row, index) => {
            return (
                <tr key={row.id}>
                    <td>{index}</td>
                    {
                        columns.map(col => {
                            return (
                                <td key={`${col.key}`}>
                                    {col.render ? col.render(row[col.dataIndex]) : row[col.dataIndex]}
                                </td>
                            )
                        })
                    }
                </tr>
            );
        });
    }

    renderNoData() {
        return (
            <tr>
                <td className="text-center" colSpan="5">No data to display.</td>
            </tr>
        )
    }

    render() {
        const { dataSource, columns, loading } = this.props;
        return (
            <div className={`rui-table table-responsive ${this.props.loading ? 'loading' : ''}`}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            {this.renderHeader(columns)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBody(columns, dataSource)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;
import React, { Component, PropTypes } from 'react';
import Pagination from '../pagination';
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

    // generateOrder(currentPage, perPage, index) {
    //     return (currentPage - 1) * perPage + index + 1;
    // }

    renderHeader(columns) {
        return columns.map(col => {
            return (
                <th key={col.key} width={col.width}>{col.title}</th>
            );
        })
    }

    renderBody(columns, dataSource, pagination) {
        return dataSource.map((row, index) => {
            return (
                <tr key={row.id}>
                    <td>{row.id}</td>
                    {
                        columns.map(col => {
                            return (
                                <td key={`${col.key}`}>
                                    {col.render ? col.render(row[col.dataIndex], row) : row[col.dataIndex]}
                                </td>
                            )
                        })
                    }
                </tr>
            );
        });
    }

    renderNoData(columns) {
        return (
            <tr>
                <td className="text-center" colSpan={columns.length + 1}>没有数据</td>
            </tr>
        )
    }

    render() {
        const { columns, dataSource, pagination, loading } = this.props;
        return (
            <div className={`rui-table table-responsive ${loading ? 'loading' : ''}`}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            {this.renderHeader(columns)}
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource.length ? this.renderBody(columns, dataSource, pagination) : this.renderNoData(columns)}
                    </tbody>
                </table>
                {dataSource.length ? <Pagination {...pagination} /> : null}
            </div>
        );
    }
}

export default Table;
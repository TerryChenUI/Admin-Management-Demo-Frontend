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

    getNumberIndex(pageSize, pageCount, index) {
        return (pageSize - 1) * pageCount + index + 1;
    }

    renderHeader() {
        const { columns } = this.props;
        return columns.map(col => {
            return (
                <th key={col.key} width={col.width}>{col.title}</th>
            );
        })
    }

    renderBody() {
        const { dataSource, columns, pagination } = this.props;
        const numberOfPage = Math.ceil(this.props.total / this.props.pageCount);
        return dataSource.map((row, index) => {
            return (
                <tr key={row.id}>
                    <td>{this.getNumberIndex(pagination.pageSize, pagination.pageCount, index)}</td>
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

    renderNoData() {
        const { columns } = this.props;
        return (
            <tr>
                <td className="text-center" colSpan={columns.length + 1}>No data to display.</td>
            </tr>
        )
    }

    render() {
        const { dataSource, pagination, loading } = this.props;
        return (
            <div className={`rui-table table-responsive ${loading ? 'loading' : ''}`}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            {this.renderHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource.length ? this.renderBody() : this.renderNoData()}
                    </tbody>
                </table>
                {dataSource.length ? <Pagination {...pagination} /> : null}
            </div>
        );
    }
}

export default Table;
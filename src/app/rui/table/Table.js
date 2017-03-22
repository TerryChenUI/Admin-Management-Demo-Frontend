import React from 'react';
import Styles from 'Table';

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        pageSize: 1,
        pageCount: 3,
        total: 0
    };

    static propTypes = {
        pageSize: React.PropTypes.number,
        pageCount: React.PropTypes.number,
        total: React.PropTypes.number,
        onChange: React.PropTypes.func,
    };

    renderRow(data) {
        if (data) {
            return data.result.map(row => {
                return (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.enabled}</td>
                        <td>2017 02-27 14:20</td>
                        <td>
                            <button type="button" className="btn btn-primary btn-xs">
                                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> 编辑
                                    </button>
                            <button type="button" className="btn btn-danger btn-xs">
                                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> 删除
                                    </button>
                        </td>
                    </tr>
                );
            });
        } else if (data && !data.length) {
            return (
                <tr>
                    <td className="text-center" colSpan="5">No data to display.</td>
                </tr>
            )
        }
    };

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>类别</th>
                            <th>启用</th>
                            <th>发布时间</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isFetching ? this.renderFetching() : this.renderRow(data)
                        }
                    </tbody>
                </table>
                <div className="mask">
                    Loading
                </div>
            </div>
        );
    }
}

export default Table;
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getAllCategories, deleteCategory } from '../../actions/Category';
import Pagination from '../../rui/pagination/Pagination';
import '../../rui/table/Table.css';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 1,
            pageCount: 3,
            total: 0
        }
    }

    componentDidMount() {
        this.props.getAllCategories(this.state.pageSize, this.state.pageCount);
    }

    onPageChange = (pageSize) => {
        this.setState({
            pageSize: pageSize
        });
        this.props.getAllCategories(pageSize, this.state.pageCount);
    };

    remove (id) {
        deleteCategory(id);
    };

    renderRow(data) {
        if (data) {
            return data.result.map(row => {
                return (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.enabled.toString()}</td>
                        <td>
                            <Link to={`/category/add`} className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> 编辑</Link>
                            <button type="button" className="btn btn-danger btn-xs" onClick={() => this.remove(row.id)}>
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
        const { data, error, isFetching } = this.props.list;
        if (data) {
            this.state.total = data.total;
        }
        return (
            <div>
                <h2 className="sub-header">
                    文章类别
                    <Link to='/category/edit' className='btn btn-success btn-sm'>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 添加
                    </Link>
                </h2>
                <form className="form-inline search-form">
                    <div className="form-group">
                        <label htmlFor="name">类别</label>
                        <input type="text" className="form-control" id="name" placeholder="关键字" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm">Search</button>
                </form>
                <div className={`rui-table table-responsive ${isFetching ? 'loading' : ''}`}>
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
                            {this.renderRow(data)}
                        </tbody>
                    </table>
                </div>
                <Pagination {...this.state} onChange={this.onPageChange} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        list: state.category.list
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCategories: (page, count) => {
            dispatch(getAllCategories(page, count));
        },
        deleteCategory: (id) => {
            dispatch(deleteCategory(id));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList)
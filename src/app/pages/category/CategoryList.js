import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getAllCategories, deleteCategory } from '../../actions/Category';
import Pagination from '../../rui/pagination';
import Table from '../../rui/table';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {
                name: ''
            },
            pagination: {
                pageSize: 1,
                pageCount: 3,
                total: 0
            }
        }
    }

    componentDidMount() {
        this.props.getAllCategories(this.state.pagination.pageSize, this.state.pagination.pageCount);
    }

    onPageChange = (pageSize) => {
        const updatePagination = this.state.pagination;
        updatePagination.pageSize = pageSize;
        this.setState({
            pagination: updatePagination
        });
        this.props.getAllCategories(pageSize, this.state.pagination.pageCount);
    }

    handleNameChange(e) {
        this.setState({
            search: {
                name: e.target.value
            }
        });
    }

    remove(id) {
        this.props.deleteCategory(id);
    };

    search() {
        console.log(this.state.search.name);
    }

    render() {
        const { data, error, isFetching } = this.props.list;
        if (data) {
            this.state.pagination.total = data.total;
        }
        const columns = [
            {
                title: '类别',
                key: 'name',
                dataIndex: 'name'
            },
            {
                title: '状态',
                key: 'enabled',
                dataIndex: 'enabled',
                render: (enabled) => (
                    <span>
                        {enabled ? '启用' : '禁用'}
                    </span>
                ),
            },
            {
                title: '操作',
                key: 'action',
                dataIndex: 'id',
                render: (id) => (
                    <div>
                        <Link to={`/category/edit/${id}`} className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> 编辑</Link>
                        <button type="button" className="btn btn-danger btn-xs" onClick={() => this.remove(id)}>
                            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> 删除
                        </button>
                    </div>
                ),
            }
        ];
        return (
            <div>
                <h2 className="sub-header">
                    文章类别
                    <Link to='/category/add' className='btn btn-success btn-sm'>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 添加
                    </Link>
                </h2>
                <form className="form-inline search-form">
                    <div className="form-group">
                        <label htmlFor="name">类别</label>
                        <input type="text" className="form-control" id="name" value={this.state.search.name} onChange={(e) => this.handleNameChange(e)} />
                    </div>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => this.search()}>Search</button>
                </form>
                {data && <Table columns={columns} dataSource={data.result} loading={isFetching} />}
                <Pagination {...this.state.pagination} onChange={this.onPageChange} />
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
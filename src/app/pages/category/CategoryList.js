import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getAllCategories, deleteCategory } from '../../actions/Category';
import Table from '../../rui/table';
import Popconfirm from '../../rui/popconfirm';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {
                name: ''
            },
            pageSize: 1,
            pageCount: 5
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
    }

    getPagination(total) {
        return {
            pageSize: this.state.pageSize,
            pageCount: this.state.pageCount,
            total: total,
            onChange: this.onPageChange
        }
    }

    handleNameChange(e) {
        this.setState({
            search: {
                name: e.target.value
            }
        });
    }

    search() {
        console.log(this.state.search.name);
    }

    onConfirmDelete(e) {
        this.props.deleteCategory(id);
    }

    render() {
        const { data, error, isFetching } = this.props.list;
        const pagination = data ? this.getPagination(data.total) : null;
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
                        <Popconfirm title="你确认要删除这条记录?" onConfirm={this.onConfirmDelete} okText="确定" cancelText="取消">
                            <button type="button" className="btn btn-danger btn-xs">
                                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> 删除
                            </button>
                        </Popconfirm>
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
                {data ? <Table columns={columns} dataSource={data.result} pagination={pagination} loading={isFetching} /> : null}
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
        getAllCategories: (pageSize, pageCount) => {
            dispatch(getAllCategories(pageSize, pageCount));
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
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getAllCategories, deleteCategory, resetDeleteCategory } from '../../actions/Category';
import Table from '../../rui/table';
import Popconfirm from '../../rui/popconfirm';
import alertService from '../../services/AlertService';
import { defaultPageSize, defaultPageCount } from '../../constants';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {
                name: ''
            },
            filter: null,
            pageSize: defaultPageSize,
            pageCount: defaultPageCount
        }
    }

    componentDidMount() {
        this.getAllCategories(this.state.filter, this.state.pageSize, this.state.pageCount);
    }

    componentWillUnmount() {
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.deleted.data || nextProps.deleted.error) && !nextProps.deleted.isFetching) {
            nextProps.deleted.error ? alertService.error('删除失败', nextProps.deleted.error) : alertService.success('删除成功');
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    onPageChange = (pageSize) => {
        this.setState({
            pageSize: pageSize
        });
        this.getAllCategories(this.state.filter, pageSize, this.state.pageCount);
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

    getAllCategories(filter, pageSize, pageCount) {
        this.props.getAllCategories(filter, pageSize, pageCount);
    }

    search() {
        const filter = {};
        if (this.state.search.name) {
            filter.name = this.state.search.name;
        }
        this.setState({ filter: filter, pageSize: defaultPageSize, pageCount: defaultPageCount });
        this.getAllCategories(filter, defaultPageSize, defaultPageCount);
    }

    reset() {
        this.setState({
            search: {
                name: ''
            },
            filter: null
        });
    }

    onConfirmDelete(id) {
        this.props.deleteCategory(id);
    }

    render() {
        const { data, error, isFetching } = this.props.list;
        const deleted = this.props.deleted;
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
                        <Popconfirm title="你确认要删除这条记录?" onConfirm={() => this.onConfirmDelete(id)} okText="确定" cancelText="取消">
                            <button type="button" className="btn btn-danger btn-xs" disabled={id === deleted.data && deleted.isFetching}>
                                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> {id === deleted.data && deleted.isFetching ? '正在删除' : '删除'}
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
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => this.search()}>查询</button>
                    <button type="button" className="btn btn-default btn-sm" onClick={() => this.reset()}>重置</button>
                </form>
                {data ? <Table columns={columns} dataSource={data.result} pagination={pagination} loading={isFetching} /> : null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        list: state.category.list,
        deleted: state.category.deleted
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCategories: (filter, pageSize, pageCount) => dispatch(getAllCategories(filter, pageSize, pageCount)),
        deleteCategory: (id) => dispatch(deleteCategory(id)),
        resetMe: () => dispatch(resetDeleteCategory())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList)
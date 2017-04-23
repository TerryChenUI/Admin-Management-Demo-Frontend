import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllTags, deleteTag, resetDeleteTag } from '../../../actions/Tag';
import Table from '../../../rui/table';
import Popconfirm from '../../../rui/popconfirm';
import alertService from '../../../services/AlertService';
import { defaultPageSize, defaultPageCount } from '../../../constants';

class TagList extends React.Component {
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
        this.getAllTags(this.state.filter, this.state.pageSize, this.state.pageCount);
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
        this.getAllTags(this.state.filter, pageSize, this.state.pageCount);
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

    getAllTags(filter, pageSize, pageCount) {
        this.props.getAllTags(filter, pageSize, pageCount);
    }

    search() {
        const filter = {};
        if (this.state.search.name) {
            filter.name = this.state.search.name;
        }
        this.setState({ filter: filter, pageSize: defaultPageSize, pageCount: defaultPageCount });
        this.getAllTags(filter, defaultPageSize, defaultPageCount);
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
        this.props.deleteTag(id);
    }

    render() {
        const { data, error, isFetching } = this.props.list;
        const deleted = this.props.deleted;
        const pagination = data ? this.getPagination(data.total) : null;
        const columns = [
            {
                title: '标签',
                key: 'name',
                dataIndex: 'name'
            },
            {
                title: '别名',
                key: 'slug',
                dataIndex: 'slug'
            },
            {
                title: '描述',
                key: 'description',
                dataIndex: 'description'
            },
            {
                title: '排序',
                key: 'displayOrder',
                dataIndex: 'displayOrder'
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
                        <Link to={`/tag/edit/${id}`} className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> 编辑</Link>
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
                <div className="page-title">
                    <div className="title_left">
                        <h3>所有标签</h3>
                    </div>

                    <div className="title_right">
                        <div className="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                            test
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>标签管理 <small><Link to='/tag/add' className='btn btn-primary btn-xs'><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 添加</Link></small></h2>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <form className="form-inline search-from">
                                    <div className="form-group">
                                        <label htmlFor="name">标签</label>
                                        <input type="text" className="form-control" id="name" value={this.state.search.name} onChange={(e) => this.handleNameChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="btn btn-primary btn-sm" onClick={() => this.search()}>搜索</button>
                                        <button type="button" className="btn btn-default btn-sm" onClick={() => this.reset()}>重置</button>
                                    </div>
                                </form>
                                {data ? <Table columns={columns} dataSource={data.result} pagination={pagination} loading={isFetching} /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        list: state.tag.list,
        deleted: state.tag.deleted
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllTags: (filter, pageSize, pageCount) => dispatch(getAllTags(filter, pageSize, pageCount)),
        deleteTag: (id) => dispatch(deleteTag(id)),
        resetMe: () => dispatch(resetDeleteTag())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagList)
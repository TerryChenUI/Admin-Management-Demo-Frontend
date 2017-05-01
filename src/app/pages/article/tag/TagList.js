import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import { getAllTags, deleteTag, resetDeleteTag } from '../../../actions/Tag';
import Table from '../../../rui/table';
import Popconfirm from '../../../rui/popconfirm';
import alertService from '../../../services/AlertService';
import { defaultPageSize, defaultPageCount } from '../../../constants';
import { momentFormat } from '../../../components/Util';

class TagList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {
                keyword: '',
                enabled: '-1'
            },
            filter: null,
            currentPage: defaultPageSize,
            perPage: defaultPageCount
        }
    }

    componentDidMount() {
        this.getAllTags(this.state.filter, this.state.currentPage, this.state.perPage);
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

    onPageChange = (currentPage) => {
        this.setState({
            currentPage: currentPage
        });
        this.getAllTags(this.state.filter, currentPage, this.state.perPage);
    }

    handleKeywordChange(e) {
        const search = this.state.search;
        search.keyword = e.target.value;
        this.setState(search);
    }

    handleEnabledChange(e) {
        const search = this.state.search;
        search.enabled = e.target.value;
        this.setState(search);
    }

    getAllTags(filter, currentPage, perPage) {
        this.props.getAllTags(filter, currentPage, perPage);
    }

    search() {
        const filter = {};
        if (this.state.search.keyword) {
            filter.keyword = this.state.search.keyword;
        }
        if (this.state.search.enabled !== '-1') {
            filter.enabled = this.state.search.enabled === "1" ? true : false;
        } else {
            delete filter.enabled;
        }
        this.setState({ filter: filter, currentPage: defaultPageSize, perPage: defaultPageCount });
        this.getAllTags(filter, defaultPageSize, defaultPageCount);
    }

    reset() {
        this.setState({
            search: {
                keyword: '',
                enabled: '-1'
            },
            filter: null
        });
    }

    onConfirmDelete(id) {
        this.props.deleteTag(id);
    }

    render() {
        const { data, message, isFetching } = this.props.list;
        const pagination = { ...this.props.list.pagination, onChange: this.onPageChange };
        const deleted = this.props.deleted;
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
                dataIndex: 'displayOrder',
                width: 80
            },
            {
                title: '状态',
                key: 'enabled',
                dataIndex: 'enabled',
                width: 80,
                render: (enabled) => (
                    <span className={`fa fa-${enabled ? 'check' : 'lock'}`} aria-hidden="true"></span>
                ),
            },
            {
                title: '创建时间',
                key: 'create',
                dataIndex: 'create',
                width: 150,
                render: (create) => (
                    <span>
                        {momentFormat(create)}
                    </span>
                ),
            },
            {
                title: '更新时间',
                key: 'update',
                dataIndex: 'update',
                width: 150,
                render: (update) => (
                    <span>
                        {momentFormat(update)}
                    </span>
                ),
            },
            {
                title: '操作',
                key: 'action',
                dataIndex: 'id',
                width: 150,
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
                        <h3>文章标签</h3>
                    </div>
                    <div className="title_right">
                        <ol className="breadcrumb">
                            <li>文章管理</li>
                            <li className="active">文章标签</li>
                        </ol>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>所有标签 <small><Link to='/tag/add' className='btn btn-primary btn-xs'><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 添加</Link></small></h2>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <form className="form-inline search-from">
                                    <div className="form-group">
                                        <label htmlFor="name">标签</label>
                                        <input type="text" className="form-control" id="name" value={this.state.search.keyword} onChange={(e) => this.handleKeywordChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="enabled">状态</label>
                                        <select id="enabled" className="form-control" value={this.state.enabled} onChange={(e) => this.handleEnabledChange(e)}>
                                            <option value="-1">--请选择--</option>
                                            <option value="1">启用</option>
                                            <option value="0">禁用</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="btn btn-primary btn-sm" onClick={() => this.search()}>搜索</button>
                                        <button type="button" className="btn btn-default btn-sm" onClick={() => this.reset()}>重置</button>
                                    </div>
                                </form>
                                {data ? <Table columns={columns} dataSource={data} pagination={pagination} loading={isFetching} /> : null}
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
        getAllTags: (filter, currentPage, perPage) => dispatch(getAllTags(filter, currentPage, perPage)),
        deleteTag: (id) => dispatch(deleteTag(id)),
        resetMe: () => dispatch(resetDeleteTag())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagList)
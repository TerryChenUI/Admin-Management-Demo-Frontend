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
        const { currentPage, perPage } = this.state;
        this.props.getAllTags({ currentPage, perPage });
    }

    componentWillUnmount() {
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        alertService.deleteNotify(nextProps.deleted);
    }

    onPageChange = (currentPage) => {
        const { filter, perPage } = this.state;
        this.setState({
            currentPage: currentPage
        });
        this.props.getAllTags({ filter, currentPage, perPage });
    }

    handleChange(e) {
        const search = this.state.search;
        search[e.target.name] = e.target.value;
        this.setState(search);
    }

    search() {
        const filter = {};
        const { keyword, enabled } = this.state.search;
        keyword ? filter.keyword = keyword : delete filter.keyword;
        enabled !== '-1' ? filter.enabled = enabled === "1" : delete filter.enabled;

        this.setState({ filter, currentPage: defaultPageSize, perPage: defaultPageCount });
        this.props.getAllTags({ filter, currentPage: defaultPageSize, perPage: defaultPageCount });
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
                dataIndex: '_id',
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
                                        <label htmlFor="name">关键字</label>
                                        <input type="text" className="form-control" id="name" name="keyword" placeholder="标签，别名，描述" value={this.state.search.keyword} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="enabled">状态</label>
                                        <select id="enabled" className="form-control" name="enabled" value={this.state.enabled} onChange={(e) => this.handleChange(e)}>
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
        getAllTags: ({ filter = null, currentPage, perPage }) => {
            dispatch(getAllTags(filter, currentPage, perPage))
        },
        deleteTag: (id) => dispatch(deleteTag(id)),
        resetMe: () => dispatch(resetDeleteTag())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagList)
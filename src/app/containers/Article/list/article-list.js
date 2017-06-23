import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getArticles, deleteArticle, resetDeleteArticle } from '../../../actions/Article';
import { getAllCategories } from '../../../actions/Category';
import { getAllTags } from '../../../actions/Tag';
import Table from '../../../rui/table';
import Popconfirm from '../../../rui/popconfirm';
import alertService from '../../../services/AlertService';
import { defaultPageSize, defaultPageCount } from '../../../constants';
import { momentFormat } from '../../../components/Util';

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {
                keyword: '',
            },
            state: "-2",
            availableCategories: [],
            availableTags: [],
            filter: null,
            currentPage: defaultPageSize,
            perPage: defaultPageCount
        }
    }

    componentDidMount() {
        const { currentPage, perPage } = this.state;
        this.props.getArticles({ currentPage, perPage });

        // get all categories
        getAllCategories().then(data => {
            this.setState({ availableCategories: data });
        })

        // get all tags
        getAllTags().then(data => {
            this.setState({ availableTags: data });
        })
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
        this.props.getArticles({ filter, currentPage, perPage });
    }

    handleChange(e) {
        const search = this.state.search;
        search[e.target.name] = e.target.value;
        this.setState(search);
    }

    search() {
        const filter = {};
        const { keyword, visible, pid } = this.state.search;
        keyword ? filter.keyword = keyword : delete filter.keyword;
        visible !== '-1' ? filter.visible = visible === "1" : delete filter.visible;
        this.setState({ filter, currentPage: defaultPageSize, perPage: defaultPageCount });
        this.props.getArticles({ filter, currentPage: defaultPageSize, perPage: defaultPageCount });
    }

    reset() {
        this.setState({
            search: {
                keyword: ''
            },
            filter: null
        });
    }

    onConfirmDelete(id) {
        this.props.deleteArticle(id);
    }

    render() {
        const { data, message, isFetching } = this.props.list;
        const pagination = { ...this.props.list.pagination, onChange: this.onPageChange };
        const deleted = this.props.deleted;
        const columns = [
            {
                title: '标题',
                key: 'title',
                dataIndex: 'title'
            },
            {
                title: '简介',
                key: 'description',
                dataIndex: 'description'
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render: (state) => (
                    <span>
                        {
                            state === -1 ? '回收站' : state ? '已发布' : '草稿'
                        }
                    </span>
                ),
            },
            {
                title: '创建时间',
                key: 'create_time',
                dataIndex: 'create_time',
                width: 150,
                render: (create_time) => (
                    <span>
                        {momentFormat(create_time)}
                    </span>
                ),
            },
            {
                title: '操作',
                key: 'action',
                dataIndex: '_id',
                render: (id) => (
                    <div>
                        <Link to={`/article/edit/${id}`} className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> 编辑</Link>
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
                        <h3>所有文章</h3>
                    </div>
                    <div className="title_right">
                        <ol className="breadcrumb">
                            <li>文章管理</li>
                            <li className="active">所有文章</li>
                        </ol>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>文章列表 <small><Link to='/article/edit' className='btn btn-primary btn-xs'><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 添加</Link></small></h2>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <form className="form-inline search-from">
                                    <div className="form-group">
                                        <label htmlFor="keyword">关键字</label>
                                        <input type="text" className="form-control" id="keyword" placeholder="标题，简介，内容" value={this.state.search.keyword} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="keyword">状态</label>
                                        <select id="state" name="state" className="form-control" value={this.state.state} onChange={(e) => this.handleChange(e)}>
                                            <option value="-2">--请选择--</option>
                                            <option value="0">草稿</option>
                                            <option value="1">已发布</option>
                                            <option value="-1">已删除</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="visible">分类</label>
                                        <select id="pid" className="form-control" name="category" value={this.state.category} onChange={(e) => this.handleChange(e)}>
                                            <option value="-1">--请选择--</option>
                                            {
                                                this.state.availableCategories.map((category) => {
                                                    return <option key={category._id} value={category._id}>{category.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="visible">标签</label>
                                        <select id="pid" className="form-control" name="tag" value={this.state.tag} onChange={(e) => this.handleChange(e)}>
                                            <option value="-1">--请选择--</option>
                                            {
                                                this.state.availableTags.map((tag) => {
                                                    return <option key={tag._id} value={tag._id}>{tag.name}</option>
                                                })
                                            }
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
        list: state.article.list,
        deleted: state.article.deleted
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getArticles: ({ currentPage, perPage, filter = null }) => dispatch(getArticles(filter, currentPage, perPage)),
        deleteArticle: (id) => dispatch(deleteArticle(id)),
        resetMe: () => dispatch(resetDeleteArticle())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleList)
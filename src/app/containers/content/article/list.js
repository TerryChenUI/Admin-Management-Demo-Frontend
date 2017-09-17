import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Table, Icon, Button, Popconfirm } from 'antd';

import { ArticleAction } from '../../../actions';
import { ArticleService, CategoryService, TagService } from '../../../services';
import { notify, time, config } from '../../../utils';
import ArticleSearch from './search';

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                keyword: '',
                state: '-1',
                categories: [],
                tags: []
            },
            availableCategories: [],
            availableTags: [],
            pagination: { ...config.pager },
            deletingIds: []
        }
    }

    componentDidMount() {
        const { current, pageSize } = this.state.pagination;
        this.props.getArticles({ current, pageSize });
        this.loadAllCategories();
        this.loadAllTags();
    }

    loadAllCategories = () => {
        CategoryService.getAll().then(response => {
            const categories = response.result.data.map(m => { return { value: m._id, text: m.name } });
            this.setState({ availableCategories: [...this.state.availableCategories, ...categories] });
        }, notify.error);
    }

    loadAllTags = () => {
        TagService.getAll().then(response => {
            const tags = response.result.data.map(m => { return { value: m._id, text: m.name } });
            this.setState({ availableTags: [...this.state.availableTags, ...tags] });
        }, notify.error);
    }

    getParams = (filter) => {
        const params = {};
        if (filter.state !== '-1') params.state = filter.state;
        if (filter.keyword) params.keyword = filter.keyword;
        if (filter.categories.length) params.categories = filter.categories;
        if (filter.tags.length) params.tags = filter.tags;
        return params;
    };

    onSearch = (fieldsValue) => {
        const { current, pageSize } = this.state.pagination;
        const filter = { ...this.state.filter, ...fieldsValue }
        this.setState({ filter });

        const params = this.getParams(filter);
        this.props.getArticles({ params, current, pageSize });
    }

    onPageChange = (pageConfig) => {
        const { pagination, filter } = this.state;
        pagination.current = pageConfig.current;
        this.setState({ pagination });

        const { current, pageSize } = pagination;
        const params = this.getParams(filter);
        this.props.getArticles({ params, current, pageSize });
    }

    onConfirmDelete(id) {
        const deletingIds = [...this.state.deletingIds, id]
        this.setState({ deletingIds });
        this.props.deleteArticle(id);
    }

    isDeleting(id) {
        return this.state.deletingIds.indexOf(id) > -1;
    }

    render() {
        const { list, loading } = this.props;
        const { filter, availableCategories, availableTags } = this.state;
        const { data, pagination } = list;
        const pageConfig = { ...pagination, ...this.state.pagination };
        const searchProps = {
            filter,
            availableCategories,
            availableTags,
            onSearch: this.onSearch
        };

        const columns = [
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                width: 300,

            }, {
                title: '简介',
                dataIndex: 'description',
                key: 'description'
            }, {
                title: '所属分类',
                dataIndex: 'categories',
                key: 'categories',
                width: 120,
                render: (text, record, index) => (
                    text.map((data) => data.name).join(',')
                )
            }, {
                title: '阅读次数',
                dataIndex: 'meta.views',
                key: 'meta.views',
                width: 70
            }, {
                title: '评论',
                dataIndex: 'meta.comments',
                key: 'meta.comments',
                width: 70
            }, {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                width: 70,
                render: (text, record, index) =>  (
                    text === 2 ? '回收站' : text ? '已发布' : '草稿'
                )
            }, {
                title: '创建时间',
                key: 'create_time',
                dataIndex: 'create_time',
                width: 150,
                render: (text, record, index) => (
                    time.convert(text)
                )
            }, {
                title: '操作',
                key: '_id',
                dataIndex: '_id',
                width: 160,
                render: (id, record, index) => (
                    <span>
                        <Link to={`/articles/${id}`} style={{ marginRight: 10 }}><Button type="primary" size="small" icon="edit">编辑</Button></Link>
                        <Popconfirm title="你确认要删除这条记录?" onConfirm={() => this.onConfirmDelete(id)} okText="确定" cancelText="取消">
                            <Button type="danger" size="small" icon="delete" loading={this.isDeleting(id)}>删除</Button>
                        </Popconfirm>
                    </span>
                )
            },
        ]

        return (
            <div className="content-inner">
                <div className="page-title">
                    <h2>所有文章</h2>
                    <Link to='/articles/add'><Button type="primary" size="small" icon="plus">新增</Button></Link>
                </div>
                <ArticleSearch {...searchProps}/>
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={pageConfig}
                    onChange={this.onPageChange}
                    loading={loading}
                    rowKey={record => record._id}
                    bordered
                    simple />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        list: state.article.list,
        loading: state.article.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getArticles: ({ params, current, pageSize }) => {
            dispatch(ArticleAction.getArticlesRequest());
            ArticleService.loadList({ params, current, pageSize }).then((response) => {
                dispatch(ArticleAction.getArticles(response.result));
            }, notify.error);
        },
        deleteArticle: (id) => {
            ArticleService.remove(id).then((response) => {
                dispatch(ArticleAction.deleteArticle(response.result));
                notify.success(response.message);
            }, notify.error);
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleList);
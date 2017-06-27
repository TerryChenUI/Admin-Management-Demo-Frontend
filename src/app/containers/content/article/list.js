import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Table, Icon, Button, Popconfirm } from 'antd';

import { ArticleAction } from '../../../actions';
import { ArticleService } from '../../../services';
import { notify, time, config } from '../../../utils';
import ArticleSearch from './search';

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                keyword: '',
                state: '-1'
            },
            pagination: { ...config.pager },
            deletingIds: []
        }
    }

    componentDidMount() {
        const { current, pageSize } = this.state.pagination;
        this.props.getArticles({ current, pageSize });
    }

    onSearch = (values) => {
        const { current, pageSize } = this.state.pagination;
        this.setState({ filter: values });
        this.props.getArticles({ filter: values, current, pageSize });
    }

    onPageChange = (pagination, filters) => {
        const pageConfig = { ...this.state.pagination };
        const filter = this.state.filter;
        pageConfig.current = pagination.current
        this.setState({ pagination: pageConfig });
        this.props.getArticles({ filter, current: pagination.current, pageSize: pagination.pageSize });
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
        const { data, pagination } = list;
        const pageConfig = { ...pagination, ...this.state.pagination };

        const columns = [
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                width: 350
            }, {
                title: '描述',
                dataIndex: 'description',
                key: 'description'
            }, {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                width: 80,
                render: (text, record, index) => (
                    // <Icon type={text ? 'unlock' : 'lock'} title={text ? '可见' : '隐藏'} style={{ fontSize: 18, color: text ? '#108ee9' : '#f04134' }} />
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
                title: '更新时间',
                key: 'update_time',
                dataIndex: 'update_time',
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
                <ArticleSearch filter={this.state.filter} onSearch={this.onSearch}/>
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
        getArticles: ({ current, pageSize, filter }) => {
            dispatch(ArticleAction.getArticlesRequest());
            ArticleService.loadList({ current, pageSize, filter }).then((response) => {
                dispatch(ArticleAction.getArticles(response.result));
            }, (error) => {
                notify.error(error.response.message, error.response.error);
            });
        },
        deleteArticle: (id) => {
            ArticleService.remove(id).then((response) => {
                dispatch(ArticleAction.deleteArticle(response.result));
                notify.success(response.message);
            }, (error) => {
                notify.error(error.response.message, error.response.error);
            });
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleList);
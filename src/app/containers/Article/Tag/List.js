import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Table, Icon, Button, Popconfirm, notification } from 'antd';
import { TagAction } from '../../../actions';
import { TagService } from '../../../services';

import moment from 'moment';
import TagSearch from './search';

class TagList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                keyword: '',
                visible: '-1'
            },
            pagination: {
                current: 1,
                pageSize: 5
            }
        }
    }

    componentDidMount() {
        const { current, pageSize } = this.state.pagination;
        this.props.getTags({ current, pageSize });
    }

    onSearch = (values) => {
        const { current, pageSize } = this.state.pagination;
        this.props.getTags({ filter: values, current, pageSize });
    }

    onReset = () => {
        this.setState({
            filter: {
                keyword: '',
                visible: '-1'
            }
        });
    }

    onPageChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        const filter = this.state.filter;
        pager.current = pagination.current
        this.setState({
            pagination: pager
        });
        this.props.getTags({ filter, current: pagination.current, pageSize: pagination.pageSize });
    }

    onConfirmDelete(id) {
        this.props.deleteTag(id);
    }

    render() {
        const { data, message, error, loading } = this.props.list;
        const pagination = { ...this.props.list.pagination, ...this.state.pagination };

        const columns = [
            {
                title: '标签',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '别名',
                dataIndex: 'slug',
                key: 'slug'
            }, {
                title: '描述',
                dataIndex: 'description',
                key: 'description'
            }, {
                title: '排序',
                dataIndex: 'displayOrder',
                key: 'displayOrder',
                width: 80
            }, {
                title: '状态',
                dataIndex: 'visible',
                key: 'visible',
                width: 80,
                render: (text, record, index) => (
                    <Icon type={text ? 'unlock' : 'lock'} title={text ? '可见' : '隐藏'} style={{ fontSize: 18, color: text ? '#108ee9' : '#f04134' }} />
                )
            }, {
                title: '创建时间',
                key: 'create_time',
                dataIndex: 'create_time',
                width: 150,
                render: (text, record, index) => (
                    moment(text).format("YYYY-MM-DD HH:mm:ss")
                )
            }, {
                title: '操作',
                key: '_id',
                dataIndex: '_id',
                width: 160,
                render: (id, record, index) => (
                    <span>
                        <Link to={`/tags/${id}`} style={{ marginRight: 10 }}><Button type="primary" size="small" icon="edit">编辑</Button></Link>
                        <Popconfirm title="你确认要删除这条记录?" onConfirm={() => this.onConfirmDelete(id)} okText="确定" cancelText="取消">
                            <Button type="danger" size="small" icon="delete">删除</Button>
                        </Popconfirm>
                    </span>
                )
            },
        ]

        return (
            <div className="content-inner">
                <div className="page-title">
                    <h2>文章标签</h2>
                    <Link to='/tags/add'><Button type="primary" size="small" icon="plus">新增</Button></Link>
                </div>
                <TagSearch filter={this.props.filter} onSearch={this.onSearch} onReset={this.onReset} />
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={pagination}
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
        list: state.tag.list,
        deleted: state.tag.deleted
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTags: async ({ current, pageSize, filter }) => {
            dispatch(TagAction.getTagsRequest());
            try {
                const response = await TagService.loadList({ current, pageSize, filter });
                dispatch(TagAction.getTagsSuccess(response));
            } catch (error) {
                dispatch(TagAction.getTagsFailure(error.response));
                notification['error']({
                    message: error.response.message,
                    description: error.response.error,
                    duration: null
                });
            }
        },
        deleteTag: async (id) => {
            dispatch(TagAction.deleteTagRequest(id));
            try {
                const response = await TagService.remove(id);
                dispatch(TagAction.deleteTagSuccess(response));
            } catch (error) {
                dispatch(TagAction.deleteTagFailure(error.response));
                notification['error']({
                    message: error.response.message,
                    description: error.response.error,
                    duration: null
                });
            }
        },
        resetMe: () => dispatch(TagAction.resetDeleteTag())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagList)
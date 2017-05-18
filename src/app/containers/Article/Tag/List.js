import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Icon, Button, Popconfirm } from 'antd'
import { getTags, deleteTag, resetDeleteTag } from '../../../actions/Tag'

import moment from 'moment'
import TagFilter from './Filter';

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
                pageSize: 2
            }
        }
    }

    componentDidMount() {
        const { current, pageSize } = this.state.pagination;
        this.props.getTags({ current, pageSize });
    }

    componentWillUnmount() {
        this.props.resetMe();
    }

    onSearch = (e, values) => {
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
        const { data, message, isFetching } = this.props.list;
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
                    <Icon type={text ? 'unlock' : 'lock'} title={text ? '可见' : '禁用'} style={{ fontSize: 18, color: text ? '#108ee9' : '#f04134' }} />
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
                render: (text, record, index) => (
                    <span>
                        <Link to={`/tag/edit/${record.id}`} style={{ marginRight: 10 }}><Button type="primary" size="small" icon="edit">编辑</Button></Link>
                        <Popconfirm title="你确认要删除这条记录?" onConfirm={() => this.onConfirmDelete(record.id)} okText="确定" cancelText="取消">
                            <Button type="danger" size="small" icon="delete">删除</Button>
                        </Popconfirm>
                    </span>
                )
            },
        ]

        return (
            <div className="content-wrapper">
                <h2 className="page-title">
                    文章标签
                </h2>
                <TagFilter filter={this.props.filter} onSearch={(e, values) => this.onSearch(e, values)} onReset={this.onReset} />
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={pagination}
                    onChange={this.onPageChange}
                    loading={isFetching}
                    scroll={{ x: 1200 }}
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
        getTags: ({ current, pageSize, filter = null }) => {
            dispatch(getTags(filter, current, pageSize))
        },
        deleteTag: (id) => dispatch(deleteTag(id)),
        resetMe: () => dispatch(resetDeleteTag())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagList)
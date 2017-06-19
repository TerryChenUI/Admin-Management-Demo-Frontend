import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Table, Icon, Button, Popconfirm, notification } from 'antd';
import { 
    getTagsRequest, 
    getTags, 
    getTagsSuccess, 
    getTagsFail, 
    deleteTag, 
    resetDeleteTag 
} from '../../../actions/Tag';

import moment from 'moment';
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
                pageSize: 5
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
                        <Link to={`/tag/edit/${id}`} style={{ marginRight: 10 }}><Button type="primary" size="small" icon="edit">编辑</Button></Link>
                        <Popconfirm title="你确认要删除这条记录?" onConfirm={() => this.onConfirmDelete(text)} okText="确定" cancelText="取消">
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
                    <Link to='/tag/add'><Button type="primary" size="small" icon="plus">新增</Button></Link>
                </div>
                <TagFilter filter={this.props.filter} onSearch={this.onSearch} onReset={this.onReset} />
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={pagination}
                    onChange={this.onPageChange}
                    loading={isFetching}
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
            // dispatch(getTagsRequest());
            // try {
            //     let params = [];
            //     filter && Object.keys(filter).map((key) => {
            //         params.push(`${key}=${filter[key]}`);
            //     });
            //     params = [...params, `currentPage=${current}`, `perPage=${pageSize}`];
            //     await getFetch(`/api/tags?${params.join('&')}`);
            //     response.code ? dispatch(getTagsSuccess(response)) : dispatch(getTagsFailure(response));
            // } catch (error) {
            //    dispatch(getTagsFailure(error.message));
            // }
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
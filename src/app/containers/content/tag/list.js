import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Table, Icon, Button, Popconfirm } from 'antd';

import { TagAction } from '../../../actions';
import { TagService } from '../../../services';
import { notify, time, config } from '../../../utils';
import TagSearch from './search';

class TagList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                keyword: '',
                visible: '-1'
            },
            pagination: { ...config.pager },
            deletingIds: []
        }
    }

    componentDidMount() {
        const { current, pageSize } = this.state.pagination;
        this.props.getTags({ current, pageSize });
    }

    onSearch = (values) => {
        const { current, pageSize } = this.state.pagination;
        this.setState({ filter: values });
        this.props.getTags({ filter: values, current, pageSize });
    }

    onPageChange = (pagination, filters) => {
        const pageConfig = { ...this.state.pagination };
        const filter = this.state.filter;
        pageConfig.current = pagination.current
        this.setState({ pagination: pageConfig });
        this.props.getTags({ filter, current: pagination.current, pageSize: pagination.pageSize });
    }

    onConfirmDelete(id) {
        const deletingIds = [...this.state.deletingIds, id]
        this.setState({ deletingIds });
        this.props.deleteTag(id);
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
                title: '标签',
                dataIndex: 'name',
                key: 'name',
                width: 150
            }, {
                title: 'Slug',
                dataIndex: 'slug',
                key: 'slug',
                width: 150
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
                    time.convert(text)
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
                            <Button type="danger" size="small" icon="delete" loading={this.isDeleting(id)}>删除</Button>
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
                <TagSearch filter={this.state.filter} onSearch={this.onSearch}/>
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
        list: state.tag.list,
        loading: state.tag.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTags: ({ current, pageSize, filter }) => {
            dispatch(TagAction.getTagsRequest());
            TagService.loadList({ current, pageSize, filter }).then((response) => {
                dispatch(TagAction.getTags(response.result));
            }, (error) => {
                notify.error(error.response.message, error.response.error);
            });
        },
        deleteTag: (id) => {
            TagService.remove(id).then((response) => {
                dispatch(TagAction.deleteTag(response.result));
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
)(TagList);
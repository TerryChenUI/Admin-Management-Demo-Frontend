import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import TagForm from './TagForm';
import {
    getTagById, resetCurrentTag,
    createTag, resetCreateTag,
    updateTag, resetUpdateTag
} from '../../../actions/Tag';
import alertService from '../../../services/AlertService';

class TagEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const id = this.props.params.id;
        id && this.props.getTagById(id);
    }

    componentWillUnmount() {
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.created.data || nextProps.created.error) {
            nextProps.created.data ? alertService.success('添加类别成功', null, '/tag/list') : alertService.error('添加类别失败', nextProps.created.error);
        } else if (nextProps.updated.data || nextProps.updated.error) {
            nextProps.updated.data ? alertService.success('更新类别成功', null, '/tag/list') : alertService.error('更新类别失败', nextProps.updated.error);
        }
    }

    render() {
        const props = this.props;
        const id = props.params.id;
        const data = props.current.data;
        const onSubmit = id ? props.updateTag : props.createTag;
        return (
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>{id ? '编辑' : '新增'}标签 <small><Link to='/tag/list'><span className="fa fa-angle-double-left" aria-hidden="true"></span> 返回列表</Link></small></h2>
                            <div className="clearfix"></div>
                        </div>
                        <div class="x_content">
                            {/*<p class="text-muted font-13 m-b-30">
                                DataTables has most features enabled by default, so all you need to do to use it with your own tables is to call the construction function: <code>$().DataTable();</code>
                            </p>*/}
                            <TagForm initialValues={data} onSubmit={onSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        current: state.tag.current,
        created: state.tag.created,
        updated: state.tag.updated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTagById: (id) => dispatch(getTagById(id)),
        createTag: (params) => dispatch(createTag(params)),
        updateTag: (params) => dispatch(updateTag(params.id, params)),
        resetMe: () => {
            dispatch(resetCurrentTag());
            dispatch(resetCreateTag());
            dispatch(resetUpdateTag());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagEdit)
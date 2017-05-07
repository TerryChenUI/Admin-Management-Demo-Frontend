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
            alertService.createNotify(nextProps.created, { redirectUrl: '/tag/list' });
        } else if (nextProps.updated.data || nextProps.updated.error) {
            alertService.updateNotify(nextProps.updated, { redirectUrl: '/tag/list' });
        }
    }

    render() {
        const props = this.props;
        const id = props.params.id;
        const data = props.current.data;
        const onSubmit = id ? props.updateTag : props.createTag;
        return (
            <div>
                <div className="page-title">
                    <div className="title_left">
                        <h3>文章标签</h3>
                    </div>
                    <div className="title_right">
                        <ol className="breadcrumb">
                            <li>文章管理</li>
                            <li><Link to={`/tag/list`}>文章标签</Link></li>
                        </ol>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>{id ? '编辑' : '新增'}标签</h2>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <TagForm initialValues={data} onSubmit={onSubmit} />
                            </div>
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
        updateTag: (params) => dispatch(updateTag(params._id, params)),
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
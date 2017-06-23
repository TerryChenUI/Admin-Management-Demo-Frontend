import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Spin } from 'antd';

import { notify } from '../../../utils';
import { TagAction } from '../../../actions';
import { TagService } from '../../../services';

import TagForm from './form';

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

    render() {
        const props = this.props;
        const id = props.params.id;
        const { data, loading } = props.current;
        const onSubmit = id ? props.updateTag : props.createTag;
        return (
            <div className="content-inner">
                <div className="page-title">
                    <h2>{id ? '编辑' : '新增'}标签</h2>
                </div>
                <Spin spinning={loading} delay={500} >
                    <TagForm initialValue={data} onSubmit={onSubmit} />
                </Spin>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        current: state.tag.current,
        created: state.tag.created,
        updated: state.tag.updated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTagById: async (id) => {
            dispatch(TagAction.getTagByIdRequest());
            try {
                const response = await TagService.getById(id);
                dispatch(TagAction.getTagByIdSuccess(response));
            } catch (error) {
                dispatch(TagAction.getTagByIdFailure(error.response));
            }
        },
        createTag: async (params) => {
            dispatch(TagAction.createTagRequest());
            try {
                const response = await TagService.create(params);
                dispatch(TagAction.createTagSuccess(response));
                notify.success(response.message);
                browserHistory.push('/tags');
            } catch (error) {
                dispatch(TagAction.createTagFailure(error.response));
                notify.error(error.response.message, error.response.error);
            }
        },
        updateTag: async (params) => {
            dispatch(TagAction.updateTagRequest());
            try {
                const response = await TagService.update(params);
                dispatch(TagAction.updateTagSuccess(response));
                notify.success(response.message);
                browserHistory.push('/tags');
            } catch (error) {
                dispatch(TagAction.updateTagFailure(error.response));
                notify.error(error.response.message, error.response.error);
            }
        },
        resetMe: () => {
            dispatch(TagAction.resetCurrentTag());
            dispatch(TagAction.resetCreateTag());
            dispatch(TagAction.resetUpdateTag());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagEdit)
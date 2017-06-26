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
        if (id) {
            this.props.getTagById(id);
        }
    }

    render() {
        const { selected, loading, params, createTag, updateTag } = this.props;
        const onSubmit = params.id ? updateTag : createTag;
        return (
            <div className="content-inner">
                <div className="page-title">
                    <h2>{params.id ? '编辑' : '添加'}标签</h2>
                </div>
                <Spin spinning={loading} delay={500} >
                    <TagForm initialValue={selected} onSubmit={onSubmit} />
                </Spin>
            </div>
        );
    }
}

function mapStateToProps(state, ownState) {
    return ownState.params.id ? {
        selected: state.tag.selected,
        loading: state.tag.loading
    } : { loading: false };
}

function mapDispatchToProps(dispatch) {
    return {
        getTagById: (id) => {
            dispatch(TagAction.getTagByIdRequest());
            TagService.getById(id).then((response) => {
                dispatch(TagAction.getTagById(response.result));
            }, (error) => {
                notify.error(error.response.message, error.response.error);
            });
        },
        createTag: (params) => {
            TagService.create(params).then((response) => {
                dispatch(TagAction.createTag(response.result));
                notify.success(response.message);
                browserHistory.push('/tags');
            }, (error) => {
                notify.error(error.response.message, error.response.error);
            });
        },
        updateTag: (params) => {
            const response = TagService.update(params).then((response) => {
                dispatch(TagAction.updateTag(response.result));
                notify.success(response.message);
                browserHistory.push('/tags');
            }, (error) => {
                notify.error(error.response.message, error.response.error)
            });
        }
        // ,checkExist: (slug) => {
        //     return TagService.checkExist(slug);
        // }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagEdit);
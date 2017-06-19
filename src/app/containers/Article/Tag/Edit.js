import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TagForm from './Form';
import {
    getTagById, resetCurrentTag,
    createTag, resetCreateTag,
    updateTag, resetUpdateTag
} from '../../../actions/Tag';
import { browserHistory } from 'react-router';
import { notification } from 'antd';

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
            if (nextProps.created.data) {
                notification['success']({
                    message: nextProps.created.message,
                    description: nextProps.created.error,
                });
                browserHistory.push('/tag/list')
            } else {
                notification['error']({
                    message: nextProps.created.message,
                    description: nextProps.created.error,
                    duration: null
                });
            }
        } else if (nextProps.updated.data || nextProps.updated.error) {
            if (nextProps.updated.data) {
                notification['success']({
                    message: nextProps.updated.message,
                    description: nextProps.updated.error,
                });
                browserHistory.push('/tag/list')
            } else {
                notification['error']({
                    message: nextProps.updated.message,
                    description: nextProps.updated.error,
                    duration: null
                });
            }
        }
    }

    render() {
        const props = this.props;
        const id = props.params.id;
        const data = props.current.data;
        const onSubmit = id ? props.updateTag : props.createTag;
        return (
            <div className="content-inner">
                <div className="page-title">
                    <h2>{id ? '编辑' : '新增'}标签</h2>
                </div>
                <TagForm initialValue={data} onSubmit={onSubmit} />
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
        createTag: (params) => {
            dispatch(createTag(params))
        },
        updateTag: (params) => {
            dispatch(updateTag(params._id, params))
        },
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
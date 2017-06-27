import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Spin } from 'antd';

import { notify } from '../../../utils';
import { CategoryAction } from '../../../actions';
import { CategoryService } from '../../../services';
import CategoryForm from './form';

class CategoryEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const id = this.props.params.id;
        if (id) {
            this.props.getCategoryById(id);
        }
    }

    render() {
        const { selected, loading, params, createCategory, updateCategory } = this.props;
        const onSubmit = params.id ? updateCategory : createCategory;
        return (
            <div className="content-inner">
                <div className="page-title">
                    <h2>{params.id ? '编辑' : '添加'}分类</h2>
                </div>
                <Spin spinning={loading} delay={500} >
                    <CategoryForm initialValue={selected} onSubmit={onSubmit} />
                </Spin>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return ownProps.params.id ? {
        selected: state.category.selected,
        loading: state.category.loading
    } : { loading: false };
}

function mapDispatchToProps(dispatch) {
    return {
        getCategoryById: (id) => {
            dispatch(CategoryAction.getCategoryByIdRequest());
            CategoryService.getById(id).then((response) => {
                dispatch(CategoryAction.getCategoryById(response.result));
            }, (error) => {
                notify.error(error.response.message, error.response.error);
            });
        },
        createCategory: (params) => {
            CategoryService.create(params).then((response) => {
                dispatch(CategoryAction.createCategory(response.result));
                notify.success(response.message);
                browserHistory.push('/categories');
            }, (error) => {
                notify.error(error.response.message, error.response.error);
            });
        },
        updateCategory: (params) => {
            const response = CategoryService.update(params).then((response) => {
                dispatch(CategoryAction.updateCategory(response.result));
                notify.success(response.message);
                browserHistory.push('/categories');
            }, (error) => {
                notify.error(error.response.message, error.response.error)
            });
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryEdit);
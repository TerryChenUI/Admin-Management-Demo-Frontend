import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Spin } from 'antd';

import { notify, config } from '../../../utils';
import { CategoryAction } from '../../../actions';
import { CategoryService } from '../../../services';
import CategoryForm from './form';

class CategoryEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            availableCategories: [config.constant.defaultOption]
        };
    }

    componentDidMount() {
        const id = this.props.params.id;
        if (id) {
            this.props.getCategoryById(id);
        }
        this.loadAllCategories();
    }

    loadAllCategories = () => {
        CategoryService.getAll().then(response => {
            const categories = response.result.data.map(m => { return { value: m._id, text: m.name } });
            this.setState({ availableCategories: [...this.state.availableCategories, ...categories] });
        }, notify.error);
    }

    checkSlugExist = (value) => {
        const param = `slug=${value.trim()}`;
        return CategoryService.checkExist(param);
    }

    render() {
        const { selected, loading, params, createCategory, updateCategory } = this.props;
        const { availableCategories } = this.state;
        const onSubmit = params.id ? updateCategory : createCategory;
        const formProps = {
            availableCategories,
            initialValue: selected,
            onSubmit: onSubmit,
            checkExist: this.checkSlugExist
        };

        return (
            <div className="content-inner">
                <div className="page-title">
                    <h2>{params.id ? '编辑' : '添加'}分类</h2>
                </div>
                <Spin spinning={loading} delay={500} >
                    <CategoryForm {...formProps} />
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
            }, notify.error);
        },
        createCategory: (params) => {
            CategoryService.create(params).then((response) => {
                dispatch(CategoryAction.createCategory(response.result));
                notify.success(response.message);
                browserHistory.push('/categories');
            }, notify.error);
        },
        updateCategory: (params) => {
            const response = CategoryService.update(params).then((response) => {
                dispatch(CategoryAction.updateCategory(response.result));
                notify.success(response.message);
                browserHistory.push('/categories');
            }, notify.error);
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryEdit);
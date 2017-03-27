import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { getCategoryById, createCategory, updateCategory, resetCurrentCategory, resetCreateCategory, resetUpdateCategory, resetDeleteCategory } from '../../actions/Category';
import CategoryForm from './CategoryForm';
import notification from '../../rui/notification';

class CategoryEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.params.id) {
            this.props.getCategoryById(this.props.params.id);
        }
    }

    componentWillUnmount() {
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.created.data || nextProps.created.error) {
            if (nextProps.created.data) {
                notification.success({
                    message: 'Success',
                    description: 'Create category successfully',
                });
                browserHistory.push(`/category/list`);
            } else {
                notification.error({
                    message: 'Error',
                    description: nextProps.error,
                });
            }
        } else if (nextProps.updated.data || nextProps.updated.error) {
            if (nextProps.updated.data) {
                notification.success({
                    message: 'Success',
                    description: 'Update category successfully',
                });
                browserHistory.push(`/category/list`);
            } else {
                notification.error({
                    message: 'Error',
                    description: nextProps.error,
                });
            }
        }
    }

    render() {
        const { data, error, isFetching } = this.props.current;
        const handleSubmit = this.props.params.id ? this.props.updateCategory : this.props.createCategory;
        return (
            <div>
                <h2>category {this.props.params.id ? 'edit' : 'add'} page</h2>
                <CategoryForm data={data} handleSubmit={handleSubmit} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        current: state.category.current,
        created: state.category.created,
        updated: state.category.updated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategoryById: (id) => dispatch(getCategoryById(id)),
        createCategory: (data) => dispatch(createCategory(data)),
        updateCategory: (data) => dispatch(updateCategory(data.id, data)),
        resetMe: () => {
            dispatch(resetCurrentCategory());
            dispatch(resetCreateCategory());
            dispatch(resetUpdateCategory());
            dispatch(resetDeleteCategory());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryEdit)
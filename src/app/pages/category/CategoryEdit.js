import React from 'react';
import { connect } from 'react-redux';

import CategoryForm from './CategoryForm';
import {
    getCategoryById, resetCurrentCategory,
    createCategory, resetCreateCategory,
    updateCategory, resetUpdateCategory
} from '../../actions/Category';
import alertService from '../../services/AlertService';

class CategoryEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const id = this.props.params.id;
        id && this.props.getCategoryById(id);
    }

    componentWillUnmount() {
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.created.data || nextProps.created.error) {
            nextProps.created.data ? alertService.success('添加类别成功', null, '/category/list') : alertService.error('添加类别失败', nextProps.created.error);
        } else if (nextProps.updated.data || nextProps.updated.error) {
            nextProps.updated.data ? alertService.success('更新类别成功', null, '/category/list') : alertService.error('更新类别失败', nextProps.updated.error);
        }
    }

    render() {
        const props = this.props;
        const id = props.params.id;
        const data = props.current.data;
        const onSubmit = id ? props.updateCategory : props.createCategory;
        return (
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>{id ? '编辑' : '新增'}类别</h2>
                            <div className="clearfix"></div>
                        </div>
                        <div class="x_content">
                            <p class="text-muted font-13 m-b-30">
                                DataTables has most features enabled by default, so all you need to do to use it with your own tables is to call the construction function: <code>$().DataTable();</code>
                            </p>
                            <CategoryForm initialValues={data} onSubmit={onSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        current: state.category.current,
        created: state.category.created,
        updated: state.category.updated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategoryById: (id) => dispatch(getCategoryById(id)),
        createCategory: (params) => dispatch(createCategory(params)),
        updateCategory: (params) => dispatch(updateCategory(params.id, params)),
        resetMe: () => {
            dispatch(resetCurrentCategory());
            dispatch(resetCreateCategory());
            dispatch(resetUpdateCategory());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryEdit)
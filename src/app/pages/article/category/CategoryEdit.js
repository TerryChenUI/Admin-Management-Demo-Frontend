import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import CategoryForm from './CategoryForm';
import {
    getCategoryById, resetCurrentCategory,
    createCategory, resetCreateCategory,
    updateCategory, resetUpdateCategory,
    getAllCategories
} from '../../../actions/Category';
import alertService from '../../../services/AlertService';

class CategoryEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            availableCategories: []
        };
    }

    componentDidMount() {
        // get current data
        const id = this.props.params.id;
        id && this.props.getCategoryById(id);

        // get parents categories
        getAllCategories().then(data => {
            const parentCategories = data.filter(t => !t.pid).map(m => { return { value: m._id, text: m.name } });
            this.setState({ availableCategories: parentCategories });
        })
    }

    componentWillUnmount() {
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.created.data || nextProps.created.error) {
            alertService.createNotify(nextProps.created, { redirectUrl: '/category/list' });
        } else if (nextProps.updated.data || nextProps.updated.error) {
            alertService.updateNotify(nextProps.updated, { redirectUrl: '/category/list' });
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
                            <h2>{id ? '编辑' : '新增'}分类 <small><Link to='/category/list'><span className="fa fa-angle-double-left" aria-hidden="true"></span> 返回列表</Link></small></h2>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                            <CategoryForm initialValues={data} onSubmit={onSubmit} availableCategories={this.state.availableCategories} />
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
        createCategory: (params) => {
            if (params.pid === "-1") {
                params.pid = null;
            }
            dispatch(createCategory(params))
        },
        updateCategory: (params) => {
            if (params.pid === "-1") {
                params.pid = null;
            }
            dispatch(updateCategory(params._id, params))
        },
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
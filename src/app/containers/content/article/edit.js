import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Spin } from 'antd';

import { notify } from '../../../utils';
import { ArticleAction } from '../../../actions';
import { ArticleService, CategoryService, TagService } from '../../../services';

import ArticleForm from './form';

class ArticleEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            availableCategories: [],
            availableTags: [],
        };
    }

    componentDidMount() {
        const id = this.props.params.id;
        if (id) {
            this.props.getArticleById(id);
        }
        this.getAllCategories();
        this.getAllTags();
    }

    getAllCategories = () => {
        CategoryService.getAll().then(response => {
            const categories = response.result.data.map(m => { return { value: m._id, text: m.name } });
            this.setState({ availableCategories: [...this.state.availableCategories, ...categories] });
        }, notify.error);
    }

    getAllTags = () => {
        TagService.getAll().then(response => {
            const tags = response.result.data.map(m => { return { value: m._id, text: m.name } });
            this.setState({ availableTags: [...this.state.availableTags, ...tags] });
        }, notify.error);
    }

    render() {
        const { selected, loading, params, createArticle, updateArticle } = this.props;
        const onSubmit = params.id ? updateArticle : createArticle;
        const formProps = {
            ...this.state,
            initialValue: selected,
            onSubmit: onSubmit
        };

        return (
            <div className="content-inner">
                <div className="page-title">
                    <h2>{params.id ? '编辑' : '添加'}文章</h2>
                </div>
                <Spin spinning={loading} delay={500} >
                    <ArticleForm {...formProps}/>
                </Spin>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return ownProps.params.id ? {
        selected: state.article.selected,
        loading: state.article.loading
    } : { loading: false };
}

function mapDispatchToProps(dispatch) {
    return {
        getArticleById: (id) => {
            dispatch(ArticleAction.getArticleByIdRequest());
            ArticleService.getById(id).then((response) => {
                dispatch(ArticleAction.getArticleById(response.result));
            }, notify.error);
        },
        createArticle: (params) => {
            ArticleService.create(params).then((response) => {
                dispatch(ArticleAction.createArticle(response.result));
                notify.success(response.message);
                browserHistory.push('/articles');
            }, notify.error);
        },
        updateArticle: (params) => {
            const response = ArticleService.update(params).then((response) => {
                dispatch(ArticleAction.updateArticle(response.result));
                notify.success(response.message);
                browserHistory.push('/articles');
            }, notify.error);
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleEdit);
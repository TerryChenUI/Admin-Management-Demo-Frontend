import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Spin } from 'antd';

import { notify } from '../../../utils';
import { ArticleAction } from '../../../actions';
import { ArticleService } from '../../../services';

import ArticleForm from './form';

class ArticleEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const id = this.props.params.id;
        if (id) {
            this.props.getArticleById(id);
        }
    }

    render() {
        const { selected, loading, params, createArticle, updateArticle } = this.props;
        const onSubmit = params.id ? updateArticle : createArticle;
        return (
            <div className="content-inner">
                <div className="page-title">
                    <h2>{params.id ? '编辑' : '添加'}文章</h2>
                </div>
                <Spin spinning={loading} delay={500} >
                    <ArticleForm initialValue={selected} onSubmit={onSubmit} />
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
            }, (error) => {
                notify.error(error.response.message, error.response.error);
            });
        },
        createArticle: (params) => {
            ArticleService.create(params).then((response) => {
                dispatch(ArticleAction.createArticle(response.result));
                notify.success(response.message);
                browserHistory.push('/articles');
            }, (error) => {
                notify.error(error.response.message, error.response.error);
            });
        },
        updateArticle: (params) => {
            const response = ArticleService.update(params).then((response) => {
                dispatch(ArticleAction.updateArticle(response.result));
                notify.success(response.message);
                browserHistory.push('/articles');
            }, (error) => {
                notify.error(error.response.message, error.response.error)
            });
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleEdit);
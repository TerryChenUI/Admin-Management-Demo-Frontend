import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ArticleForm from './ArticleForm';
import {
    getArticleById, resetCurrentArticle,
    createArticle, resetCreateArticle,
    updateArticle, resetUpdateArticle
} from '../../../actions/Article';
import { getAllCategories } from '../../../actions/Category';
import { getAllTags } from '../../../actions/Tag';
import alertService from '../../../services/AlertService';

class ArticleEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            availableCategories: [],
            availableTags: []
        };
    }

    componentDidMount() {
        const id = this.props.params.id;
        id && this.props.getArticleById(id);

        // get all categories
        getAllCategories().then(data => {
            const categories = data.map(m => { return { value: m._id, text: m.name } });
            this.setState({ availableCategories: categories });
        })

        // get all tags
        getAllTags().then(data => {
            const tags = data.map(m => { return { value: m._id, text: m.name } });
            this.setState({ availableTags: tags });
        })
    }

    componentWillUnmount() {
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.created.data || nextProps.created.error) {
            alertService.createNotify(nextProps.created, { redirectUrl: '/article/list' });
        } else if (nextProps.updated.data || nextProps.updated.error) {
            alertService.updateNotify(nextProps.updated, { redirectUrl: '/article/list' });
        }
    }

    render() {
        const props = this.props;
        const id = props.params.id;
        const data = props.current.data;
        const onSubmit = id ? props.updateArticle : props.createArticle;
        return (
            <div>
                <div className="page-title">
                    <div className="title_left">
                        <h3>发布文章</h3>
                    </div>
                    <div className="title_right">
                        <ol className="breadcrumb">
                            <li><Link to='/article/list'>所有文章</Link></li>
                            <li className="active">发布文章</li>
                        </ol>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <ArticleForm initialValues={data} availableCategories={this.state.availableCategories} availableTags={this.state.availableTags} onSubmit={onSubmit} />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        current: state.article.current,
        created: state.article.created,
        updated: state.article.updated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getArticleById: (id) => dispatch(getArticleById(id)),
        createArticle: (params) => {
            dispatch(createArticle(params));
        },
        updateArticle: (params) => dispatch(updateArticle(params.id, params)),
        resetMe: () => {
            dispatch(resetCurrentArticle());
            dispatch(resetCreateArticle());
            dispatch(resetUpdateArticle());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleEdit)
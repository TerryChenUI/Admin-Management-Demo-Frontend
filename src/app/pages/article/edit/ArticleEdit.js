import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ArticleForm from './ArticleForm';
import {
    getArticleById, resetCurrentArticle,
    createArticle, resetCreateArticle,
    updateArticle, resetUpdateArticle
} from '../../../actions/Article';
import alertService from '../../../services/AlertService';

class ArticleEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const id = this.props.params.id;
        id && this.props.getArticleById(id);
    }

    componentWillUnmount() {
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.created.data || nextProps.created.error) {
            nextProps.created.data ? alertService.success('添加类别成功', null, '/article/list') : alertService.error('添加类别失败', nextProps.created.error);
        } else if (nextProps.updated.data || nextProps.updated.error) {
            nextProps.updated.data ? alertService.success('更新类别成功', null, '/article/list') : alertService.error('更新类别失败', nextProps.updated.error);
        }
    }

    render() {
        const props = this.props;
        const id = props.params.id;
        const data = props.current.data;
        const onSubmit = id ? props.updateArticle : props.createArticle;
        return (
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>{id ? '编辑' : '新增'}文章 <small><Link to='/article/list'><span className="fa fa-angle-double-left" aria-hidden="true"></span> 返回列表</Link></small></h2>
                            <div className="clearfix"></div>
                        </div>
                        <div class="x_content">
                            {/*<p class="text-muted font-13 m-b-30">
                                DataTables has most features enabled by default, so all you need to do to use it with your own tables is to call the construction function: <code>$().DataTable();</code>
                            </p>*/}
                            <ArticleForm initialValues={data} onSubmit={onSubmit} />
                        </div>
                    </div>
                </div>
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
        createArticle: (params) => dispatch(createArticle(params)),
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
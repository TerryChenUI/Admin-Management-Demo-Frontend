import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';

import { renderInputField, renderTextareaField, renderCheckboxField } from '../../../components/Field';
import { required } from '../../../components/Validate';

const ArticleForm = props => {
    const { handleSubmit, invalid, pristine, reset, submitting, onSubmit, initialValues, availableCategories } = props;
    return (
        <div className="row">
            <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-8 col-sm-8 col-xs-8">
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>基本内容</h2>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                            <div className="form-group">
                                <label className="control-label col-md-2 col-sm-2 col-xs-12">标题</label>
                                <div className="col-md-8 col-sm-8 col-xs-12">
                                    <input type="text" className="form-control" id="title" name="title" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-2 col-sm-2 col-xs-12">Seo关键字</label>
                                <div className="col-md-8 col-sm-8 col-xs-12">
                                    <input type="text" className="form-control" id="keywords" name="keywords" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-2 col-sm-2 col-xs-12">描述</label>
                                <div className="col-md-8 col-sm-8 col-xs-12">
                                    <input type="text" className="form-control" id="description" name="description" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-2 col-sm-2 col-xs-12">正文</label>
                                <div className="col-md-8 col-sm-8 col-xs-12">
                                    <textarea type="text" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-4">
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>基本设置</h2>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                            <div className="form-group">
                                <label className="control-label col-md-3 col-sm-3 col-xs-12">文章分类</label>
                                <div className="col-md-9 col-sm-9 col-xs-12">
                                    <select id="category" className="form-control">
                                        <option value="-1">--请选择--</option>
                                        {
                                            availableCategories.map(option =>
                                                <option value={option.value} key={option.value}>{option.text}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-3 col-sm-3 col-xs-12">文章标签</label>
                                <div className="col-md-9 col-sm-9 col-xs-12">
                                    <input type="text" className="form-control" id="keywords" name="keywords" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-3 col-sm-3 col-xs-12">发布状态</label>
                                <div className="col-md-9 col-sm-9 col-xs-12">
                                    <input type="text" className="form-control" id="keywords" name="keywords" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>缩略图</h2>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">

                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default reduxForm({
    form: 'articleForm',
})(ArticleForm)
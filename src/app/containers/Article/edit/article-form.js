import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';

import { renderInputField, renderTextareaField } from '../../../components/Field';
import { required } from '../../../components/Validate';

const ArticleForm = props => {
    const { handleSubmit, invalid, pristine, reset, submitting, onSubmit, initialValues, availableCategories, availableTags } = props;
    return (
        <div className="row">
            <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-7 col-sm-7 col-xs-7">
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>基本内容</h2>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                            <Field type="text" name="title" label="标题" placeholder="文章标题" labelCls="col-md-2 col-sm-2 col-xs-12" wrapperCls="col-md-8 col-sm-8 col-xs-12" component={renderInputField} validate={required} required />
                            <Field type="text" name="keywords" label="Seo关键字" placeholder="多个关键词以' , '隔开" labelCls="col-md-2 col-sm-2 col-xs-12" wrapperCls="col-md-8 col-sm-8 col-xs-12" component={renderInputField} validate={required} required />
                            <Field type="text" name="author" label="作者" placeholder="不填为本网站" labelCls="col-md-2 col-sm-2 col-xs-12" wrapperCls="col-md-8 col-sm-8 col-xs-12" component={renderInputField} />
                            <Field type="text" name="source" label="来源" placeholder="不填为本网站" labelCls="col-md-2 col-sm-2 col-xs-12" wrapperCls="col-md-8 col-sm-8 col-xs-12" component={renderInputField} />
                            <Field type="textarea" name="description" label="简短描述" placeholder="文章简短描述" labelCls="col-md-2 col-sm-2 col-xs-12" wrapperCls="col-md-8 col-sm-8 col-xs-12" component={renderTextareaField} validate={required} required />
                            <Field type="textarea" name="content" label="文章内容" placeholder="文章内容" labelCls="col-md-2 col-sm-2 col-xs-12" wrapperCls="col-md-8 col-sm-8 col-xs-12" component={renderTextareaField} validate={required} required />
                        </div>
                    </div>
                </div>
                <div className="col-md-5 col-sm-5 col-xs-5">
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>基本设置</h2>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                            <div className="form-group">
                                <label className="control-label col-md-3 col-sm-3 col-xs-12">文章分类</label>
                                <div className="col-md-9 col-sm-9 col-xs-12">
                                    {
                                        availableCategories.map(option =>
                                            <div key={option.value}>
                                                <Field name={option.value} id={option.value} component="input" type="checkbox"/> {option.text}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-3 col-sm-3 col-xs-12">文章标签</label>
                                <div className="col-md-9 col-sm-9 col-xs-12">
                                    {
                                        availableTags.map(option =>
                                            <div key={option.value}>
                                                <Field name={option.value} id={option.value} component="input" type="checkbox"/> {option.text}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-3 col-sm-3 col-xs-12">发布状态</label>
                                <div className="col-md-9 col-sm-9 col-xs-12">
                                    <Field id="state" name="state" className="form-control" component="select">
                                        <option value="0">存为草稿</option>
                                        <option value="1">直接发布</option>
                                        <option value="-1">已删除</option>
                                    </Field>
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
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="x_panel">
                        <div className="form-group">
                            <div className="col-md-6 col-md-offset-5">
                                <Link to={`/category/list`} className="btn btn-default">重置</Link>
                                <button type="submit" className="btn btn-primary" disabled={invalid || pristine || submitting}>{submitting ? '正在保存' : '保存'}</button>
                            </div>
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
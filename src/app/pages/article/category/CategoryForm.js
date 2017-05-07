import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';

import { renderLabelField, renderInputField, renderSelectField, renderTextareaField, renderCheckboxField } from '../../../components/Field';
import { required } from '../../../components/Validate';

const CategoryForm = props => {
    const { handleSubmit, invalid, pristine, reset, submitting, onSubmit, initialValues, availableCategories } = props;
    return (
        <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
            <Field type="text" name="name" label="分类" component={renderInputField} validate={required} required/>
            <Field type="text" name="slug" label="别名" component={renderInputField} validate={required} required />
            <Field type="select" name="pid" label="父分类" options={availableCategories} component={renderSelectField}/>
            <Field type="textarea" name="description" label="描述" component={renderTextareaField} />
            <Field type="number" name="displayOrder" label="排序" component={renderInputField} validate={required} />
            <Field type="checkbox" name="visible" label="启用" component={renderCheckboxField} />
            {
                initialValues && initialValues.create_time && renderLabelField('创建时间', initialValues.create_time)
            }
            {
                initialValues && initialValues.update_time && renderLabelField('最后更新时间', initialValues.update_time)
            }
            <div className="form-group">
                <div className="col-md-6 col-md-offset-3">
                    <Link to={`/category/list`} className="btn btn-default">取消</Link>
                    <button type="submit" className="btn btn-primary" disabled={invalid || pristine || submitting}>{submitting ? '正在保存' : '保存'}</button>
                </div>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'categoryForm',
})(CategoryForm)
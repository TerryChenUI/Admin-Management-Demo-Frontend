import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { renderInputField, renderTextareaField, renderCheckboxField } from '../../components/Field';
import { required } from '../../components/Validate';

const CategoryForm = props => {
    const { handleSubmit, invalid, pristine, reset, submitting, onSubmit } = props;
    return (
        <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
            <Field type="text" name="name" label="类别" component={renderInputField} validate={required} />
            <Field type="textarea" name="description" label="描述" component={renderTextareaField} />
            <Field type="number" name="displayOrder" label="排序" component={renderInputField} validate={required} />
            <Field type="checkbox" name="enabled" label="启用" component={renderCheckboxField} />
            <div className="form-group">
                <div className="col-md-6 col-md-offset-3">
                    <button type="button" className="btn btn-default">取消</button>
                    <button type="submit" className="btn btn-primary" disabled={invalid || pristine || submitting}>{submitting ? '正在保存' : '保存'}</button>
                </div>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'categoryForm',
})(CategoryForm)
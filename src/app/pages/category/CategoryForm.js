import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { renderInputField, renderTextareaField, renderCheckboxField } from '../../components/Field';
import { required } from '../../components/Validate';

const CategoryForm = props => {
    const { handleSubmit, invalid, pristine, reset, submitting, onSubmit } = props;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field type="text" name="name" label="类别" component={renderInputField} validate={required} />
            <Field type="textarea" name="description" label="描述" component={renderTextareaField} />
            <Field type="number" name="displayOrder" label="排序" component={renderInputField} validate={required} />
            <Field type="checkbox" name="enabled" label="启用" component={renderCheckboxField} />
            <button type="submit" className="btn btn-default" disabled={invalid || pristine || submitting}>{submitting ? '正在保存' : '保存'}</button>
        </form>
    );
}

export default reduxForm({
    form: 'categoryForm',
})(CategoryForm)
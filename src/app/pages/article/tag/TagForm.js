import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { renderLabelField, renderInputField, renderTextareaField, renderCheckboxField } from '../../../components/Field';
import { required } from '../../../components/Validate';

const TagForm = props => {
    const { handleSubmit, invalid, pristine, reset, submitting, onSubmit, initialValues } = props;
    return (
        <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
            <Field type="text" name="name" label="标签" component={renderInputField} validate={required} required />
            <Field type="text" name="slug" label="别名" component={renderInputField} validate={required} required />
            <Field type="textarea" name="description" label="描述" component={renderTextareaField} />
            <Field type="number" name="displayOrder" label="排序" component={renderInputField} validate={required} required />
            <Field type="checkbox" name="enabled" label="启用" component={renderCheckboxField} />
            {
                initialValues && initialValues.create_time && renderLabelField('创建时间', initialValues.create_time)
            }
            {
                initialValues && initialValues.update_time && renderLabelField('最后更新时间', initialValues.update_time)
            }
            <div className="ln_solid"></div>
            <div className="form-group">
                <div className="col-md-6 col-md-offset-3">
                    <Link to={`/tag/list`} className="btn btn-default">取消</Link>
                    <button type="submit" className="btn btn-primary" disabled={invalid || pristine || submitting}>{submitting ? '正在保存' : '保存'}</button>
                </div>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'tagForm',
})(TagForm)
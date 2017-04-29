import React from 'react';
import classNames from 'classnames';
import { momentFormat } from './Util';

const labelCls = "control-label col-md-3 col-sm-3 col-xs-12";
const wrapperCls = "col-md-4 col-sm-4 col-xs-12";
const controlCls = "form-control";

const renderErrorMessage = (touched, error) => {
    if (touched && error) {
        return (
            <div className="col-md-4 col-sm-4 col-xs-12"><span className="invalid-message">{error}</span></div>
        );
    }
}

const getFormGroupCls = (touched, error) => {
    return classNames('form-group', { 'invalid-group': touched && error });
}

export const renderLabelField = (label, value) => {
    return (
        <div className="form-group">
            <label className="control-label col-md-3 col-sm-3 col-xs-12">{label}</label>
            <div className="col-md-4 col-sm-4 col-xs-12">
                <label className="label-text">{momentFormat(value)}</label>
            </div>
        </div>
    )
}

export const renderInputField = ({ input, label, type, placeholder, required, className, meta: { touched, error, warning } }) => {
    return (
        <div className={getFormGroupCls(touched, error)}>
            <label className={labelCls} htmlFor={input.name} required>{label}</label>
            <div className={wrapperCls}>
                <input {...input} id={input.name} className={controlCls} placeholder={placeholder} type={type} />
            </div>
            {renderErrorMessage(touched, error)}
        </div>
    );
}

export const renderTextareaField = ({ input, label, type, placeholder, className, meta: { touched, error, warning } }) => {
    return (
        <div className={getFormGroupCls(touched, error)}>
            <label className={labelCls} htmlFor={input.name}>{label}</label>
            <div className={wrapperCls}>
                <textarea {...input} id={input.name} className={controlCls} placeholder={placeholder} type={type} rows="3" />
            </div>
            {renderErrorMessage(touched, error)}
        </div>
    );
}

export const renderCheckboxField = ({ input, label, type, className, meta: { touched, error, warning } }) => {
    return (
        <div className={getFormGroupCls(touched, error)}>
            <label className={labelCls} htmlFor={input.name}>{label}</label>
            <div className={wrapperCls}>
                <div className="checkbox">
                    <label>
                        <input {...input} placeholder={label} type={type} />
                    </label>
                    {renderErrorMessage(touched, error)}
                </div>
            </div>
        </div>
    );
} 
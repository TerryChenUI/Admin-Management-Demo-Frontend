import React from 'react';
import classNames from 'classnames';
import { momentFormat } from './Util';

const defaultLabelCls = "col-md-3 col-sm-3 col-xs-12";
const defaultWrapperCls = "col-md-4 col-sm-4 col-xs-12";

const renderErrorMessage = (touched, error) => {
    if (touched && error) {
        return (
            <div className="col-md-2 col-sm-2 col-xs-12"><span className="invalid-message">{error}</span></div>
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

export const renderInputField = ({ input, label, labelCls, wrapperCls, type, placeholder, required = false, meta: { touched, error, warning } }) => {
    return (
        <div className={getFormGroupCls(touched, error)}>
            <label className={`control-label ${labelCls ? labelCls : defaultLabelCls}`} htmlFor={input.name} required={required}>{label}</label>
            <div className={wrapperCls ? wrapperCls : defaultWrapperCls}>
                <input {...input} id={input.name} title={placeholder} className="form-control" placeholder={placeholder} type={type} />
            </div>
            {renderErrorMessage(touched, error)}
        </div>
    );
}

export const renderSelectField = ({ input, label, labelCls, wrapperCls, type, options, required = false, meta: { touched, error, warning } }) => {
    return (
        <div className={getFormGroupCls(touched, error)}>
            <label className={`control-label ${labelCls ? labelCls : defaultLabelCls}`} htmlFor={input.name} required={required}>{label}</label>
            <div className={wrapperCls ? wrapperCls : defaultWrapperCls}>
                <select {...input} id={input.name} className="form-control">
                    <option value="-1">--无--</option>
                    {
                        options.map(option =>
                            <option value={option.value} key={option.value}>{option.text}</option>
                        )
                    }
                </select>
            </div>
            {renderErrorMessage(touched, error)}
        </div>
    );
}


export const renderTextareaField = ({ input, label, labelCls, wrapperCls, type, placeholder, required = false, meta: { touched, error, warning } }) => {
    return (
        <div className={getFormGroupCls(touched, error)}>
            <label className={`control-label ${labelCls ? labelCls : defaultLabelCls}`} htmlFor={input.name} required={required}>{label}</label>
            <div className={wrapperCls ? wrapperCls : defaultWrapperCls}>
                <textarea {...input} id={input.name} title={placeholder} className="form-control" placeholder={placeholder} type={type} rows="3" />
            </div>
            {renderErrorMessage(touched, error)}
        </div>
    );
}

export const renderCheckboxField = ({ input, label, labelCls, wrapperCls, type, className, required = false, meta: { touched, error, warning } }) => {
    return (
        <div className={getFormGroupCls(touched, error)}>
            <label className={`control-label ${labelCls ? labelCls : defaultLabelCls}`} htmlFor={input.name} required={required}>{label}</label>
            <div className={wrapperCls ? wrapperCls : defaultWrapperCls}>
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
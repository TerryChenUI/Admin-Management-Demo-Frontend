import React from 'react';

const controlCls = "form-control col-md-7 col-xs-12";

const renderErrorMessage = (touched, error) => {
    if (touched && error) {
        return (
            <div className="error">{error}</div>
        )
    }
}

export const renderInputField = ({ input, label, type, placeholder, className, meta: { touched, error, warning } }) => (
    <div className="form-group">
        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor={input.name}>{label}</label>
        <div className="col-md-4 col-sm-4 col-xs-12">
            <input {...input} id={input.name} className={`${controlCls} ${className}`} placeholder={placeholder} type={type} />
        </div>
        {renderErrorMessage(touched, error)}
    </div>
)

export const renderTextareaField = ({ input, label, type, placeholder, className, meta: { touched, error, warning } }) => (
    <div className="form-group">
        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor={input.name}>{label}</label>
        <div className="col-md-4 col-sm-4 col-xs-12">
            <textarea {...input} id={input.name} className={`${controlCls} ${className}`} placeholder={placeholder} type={type} />
        </div>
        {renderErrorMessage(touched, error)}
    </div>
)

export const renderCheckboxField = ({ input, label, type, className, meta: { touched, error, warning } }) => (
    <div className="form-group">
        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor={input.name}>{label}</label>
        <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="checkbox">
                <label>
                    <input {...input} placeholder={label} className={className} type={type} /> {label}
                </label>
                {renderErrorMessage(touched, error)}
            </div>
        </div>
    </div>
)
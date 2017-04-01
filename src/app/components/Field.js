import React from 'react';

const controlCls = "form-control";

const renderErrorMessage = (touched, error) => {
    if (touched && error) {
        return (
            <div className="error">{error}</div>
        )
    }
}

export const renderInputField = ({ input, label, type, placeholder, className, meta: { touched, error, warning } }) => (
    <div className="form-group">
        <label htmlFor={input.name}>{label}</label>
        <input {...input} id={input.name} className={`${controlCls} ${className}`} placeholder={placeholder} type={type} />
        {renderErrorMessage(touched, error)}
    </div>
)

export const renderTextareaField = ({ input, label, type, placeholder, className, meta: { touched, error, warning } }) => (
    <div className="form-group">
        <label htmlFor={input.name}>{label}</label>
        <textarea {...input} id={input.name} className={`${controlCls} ${className}`} placeholder={placeholder} type={type} />
        {renderErrorMessage(touched, error)}
    </div>
)

export const renderCheckboxField = ({ input, label, type, className, meta: { touched, error, warning } }) => (
    <div className="checkbox">
        <label>
            <input {...input} placeholder={label} className={className} type={type} /> {label}
        </label>
        {renderErrorMessage(touched, error)}
    </div>
)
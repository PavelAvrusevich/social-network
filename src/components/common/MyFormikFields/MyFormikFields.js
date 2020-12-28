import { useField } from 'formik';
import React, { Children } from 'react';

export const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            {label && (
                <div>
                    <label htmlFor={props.id || props.name}> {label} </label>
                </div>
            )}
            <div>
                <input {...props} {...field} />
            </div>
            <div>{meta.touched && meta.error ? <div>{meta.error}</div> : null}</div>
        </>
    );
};

export const MyTextarea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            {label && (
                <div>
                    <label htmlFor={props.id || props.name}> {label} </label>
                </div>
            )}
            <div>
                <textarea {...props} {...field} />
            </div>
            <div>{meta.error ? <div>{meta.error}</div> : null}</div>
        </>
    );
};

export const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <>
            <div>
                <label htmlFor={props.id || props.name}>
                    <input type="checkbox" {...props} {...field} />
                    {children}
                </label>
            </div>
            <div>{meta.touched && meta.error ? <div>{meta.error}</div> : null}</div>
        </>
    );
};

import { useField } from 'formik';
import React, { FC } from 'react';

type FieldProps = {
    label?: string;
    name: string;
    placeholder?: string;
    type?: string;
    id?: string;
};

export const MyTextInput: FC<FieldProps> = ({ label, ...props }) => {
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

export const MyTextarea: FC<FieldProps> = ({ label, ...props }) => {
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

export const MyCheckbox: FC<FieldProps> = ({ children, ...props }) => {
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

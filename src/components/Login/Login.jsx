import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

let Login = (props) => {
    return (
        <Formik
            initialValues={{
                name: '',
                password: '',
                rememberMe: false,
            }}
            validationSchema={Yup.object({
                name: Yup.string().max(3, 'Max name length is 15 symbols').required('Required'),
                password: Yup.string().max(10, 'Max password length is 10 symbols').required('Required'),
            })}
            onSubmit={(values) => {}}
        >
            <Form>
                <div>
                    <label htmlFor={'name'}> Your name </label>
                </div>
                <div>
                    <Field name={'name'} placeholder={'Enter your name'} type={'text'} />
                </div>
                <div>
                    <ErrorMessage name={'name'} />
                </div>
                <div>
                    <label htmlFor={'password'}> Your password </label>
                </div>
                <div>
                    <Field name={'password'} placeholder={'Enter password'} type={'password'} />
                </div>
                <div>
                    <ErrorMessage name={'password'} />
                </div>
                <div>
                    <input type={'checkbox'} name={'rememberMe'} /> rememberMe
                </div>
                <div>
                    <button type={'submit'}> LOGIN </button>
                </div>
            </Form>
        </Formik>
    );
};

export default Login;

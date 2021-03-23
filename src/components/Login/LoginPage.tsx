import { ErrorMessage, Field, Form, Formik, FormikBag } from 'formik';
import React, { FC } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { MyCheckbox, MyTextInput } from '../common/MyFormikFields/MyFormikFields';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';
import { login, ThunkType } from '../../redux/auth-reducer';
import { ThunkDispatch } from 'redux-thunk';
import { ActionsType } from '../../redux/app-reducer';

type PropsType = {};

type InitialValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: null | string;
};

type TDispatch = Parameters<ReturnType<typeof login>>[0];
export const LoginPage: FC<PropsType> = (props) => {
    const dispatch = useDispatch<TDispatch>();
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    if (isAuth) {
        return <Redirect to={'/profile'} />;
    }
    const initialValues: InitialValuesType = {
        email: '',
        password: '',
        rememberMe: false,
        captcha: null,
    };
    const validateCaptcha = (value: string) => {
        let error;
        if (!value) {
            error = 'Required';
        }
        return error;
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                email: Yup.string().max(50, 'Max email length is 50 symbols').required('Required'),
                password: Yup.string().max(10, 'Max password length is 10 symbols').required('Required'),
            })}
            onSubmit={({ email, password, rememberMe, captcha }, { setSubmitting, setStatus }) => {
                dispatch(login(email, password, rememberMe, captcha, setStatus)).then(() =>
                    setSubmitting(false)
                );
            }}
        >
            {({ isSubmitting, status }) => (
                <Form>
                    <MyTextInput label="Your email" name="email" placeholder="Enter your email" type="text" />
                    <MyTextInput
                        label="Your password"
                        name="password"
                        placeholder="Enter password"
                        type="password"
                    />
                    <MyCheckbox name="rememberMe">rememberMe</MyCheckbox>
                    {status && <div>Error: {status}</div>}
                    {captchaUrl && (
                        <div>
                            <div>
                                <img src={captchaUrl} />
                            </div>
                            <div>
                                <Field name="captcha" type="text" validate={validateCaptcha} />
                                <ErrorMessage name="captcha" />
                            </div>
                        </div>
                    )}
                    <button disabled={isSubmitting} type="submit">
                        LOGIN
                    </button>
                </Form>
            )}
        </Formik>
    );
};

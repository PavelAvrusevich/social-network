import { ErrorMessage, Field, Form, Formik, FormikBag } from 'formik';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { MyCheckbox, MyTextInput } from '../common/MyFormikFields/MyFormikFields';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';

type Props = {
    isAuth: boolean;
    captchaUrl: string | null;
    login: (
        email: string,
        password: string,
        rememberMe: boolean,
        captcha: string | null,
        setStatus: any
    ) => Promise<void>;
};

type InitialValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: null | string;
};

const Login: FC<Props> = (props) => {
    if (props.isAuth) {
        return <Redirect to={'/profile'} />;
    }
    const initialValues: InitialValuesType = {
        email: '',
        password: '',
        rememberMe: false,
        captcha: null,
    };
    function validateCaptcha(value: string) {
        let error;
        if (!value) {
            error = 'Required';
        }
        return error;
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                email: Yup.string().max(50, 'Max email length is 50 symbols').required('Required'),
                password: Yup.string().max(10, 'Max password length is 10 symbols').required('Required'),
            })}
            onSubmit={({ email, password, rememberMe, captcha }, { setSubmitting, setStatus }) => {
                props.login(email, password, rememberMe, captcha, setStatus).then(() => setSubmitting(false));
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
                    {props.captchaUrl && (
                        <div>
                            <div>
                                <img src={props.captchaUrl} />
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

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);

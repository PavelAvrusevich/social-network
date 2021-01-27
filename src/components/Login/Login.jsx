import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { MyCheckbox, MyTextInput } from '../common/MyFormikFields/MyFormikFields';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';

const Login = (props) => {
    if (props.isAuth) {
        return <Redirect to={'/profile'} />;
    }
    function validateCaptcha(value) {
        let error;
        if (!value) {
            error = 'Required';
        }
        return error;
    }
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false,
                captcha: null,
            }}
            validationSchema={Yup.object({
                email: Yup.string().max(50, 'Max email length is 50 symbols').required('Required'),
                password: Yup.string().max(10, 'Max password length is 10 symbols').required('Required'),
            })}
            onSubmit={({ email, password, rememberMe, captcha }, { setStatus }) => {
                props.login(email, password, rememberMe, captcha, setStatus);
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
                    <button disable={isSubmitting.toString()} type="submit">
                        LOGIN
                    </button>
                </Form>
            )}
        </Formik>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);

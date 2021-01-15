import { Form, Formik } from 'formik';
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
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false,
            }}
            validationSchema={Yup.object({
                email: Yup.string().max(50, 'Max email length is 50 symbols').required('Required'),
                password: Yup.string().max(10, 'Max password length is 10 symbols').required('Required'),
            })}
            onSubmit={({ email, password, rememberMe }, { setStatus }) => {
                props.login(email, password, rememberMe, setStatus);
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
});

export default connect(mapStateToProps, { login })(Login);

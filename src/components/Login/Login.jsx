import { Form, Formik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { MyCheckbox, MyTextInput } from '../common/MyFormikFields/MyFormikFields';
import { login } from '../../redux/auth-reducer';

let Login = (props) => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false,
            }}
            validationSchema={Yup.object({
                name: Yup.string().max(3, 'Max name length is 15 symbols').required('Required'),
                password: Yup.string().max(10, 'Max password length is 10 symbols').required('Required'),
            })}
            onSubmit={({ email, password, rememberMe }) => {
                props.login(email, password, rememberMe);
            }}
        >
            <Form>
                <MyTextInput label="Your email" name="email" placeholder="Enter your email" type="text" />
                <MyTextInput
                    label="Your password"
                    name="password"
                    placeholder="Enter password"
                    type="password"
                />
                <MyCheckbox name="rememberMe">rememberMe</MyCheckbox>
                <button type="submit"> LOGIN </button>
            </Form>
        </Formik>
    );
};

export default connect(null, { login })(Login);

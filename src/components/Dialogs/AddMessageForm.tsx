import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Action } from 'redux';
import * as Yup from 'yup';
import { MyTextarea } from '../common/MyFormikFields/MyFormikFields';

type props = {
    sendMessage: (newMessageBody: string) => void;
};

type InitialValuesType = {
    newMessageBody: string;
};

const AddMessageForm: React.FC<props> = (props) => {
    const initialValues: InitialValuesType = {
        newMessageBody: '',
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                newMessageBody: Yup.string().max(50, 'Max message length is 50 symbols'),
            })}
            onSubmit={(values) => props.sendMessage(values.newMessageBody)}
        >
            <Form>
                <MyTextarea name="newMessageBody" placeholder="введите сообщение" />
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    );
};

export default AddMessageForm;

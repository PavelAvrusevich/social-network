import { Field, Form, Formik } from 'formik';
import React from 'react';

function AddMessageForm(props) {
    return (
        <Formik
            initialValues={{
                newMessageBody: '',
            }}
            onSubmit={(values) => props.sendMessage(values.newMessageBody)}
        >
            <Form>
                <Field name="newMessageBody" as="textarea" placeholder="введите сообщение" />
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    );
}

export default AddMessageForm;

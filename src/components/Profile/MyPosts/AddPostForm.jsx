import React from 'react';
import { Field, Form, Formik } from 'formik';

function AddPostForm(props) {
    return (
        <Formik
            initialValues={{
                newPostBody: '',
            }}
            onSubmit={(values) => props.addPost(values.newPostBody)}
        >
            <Form>
                <Field name="newPostBody" as="textarea" placeholder="Введите текст поста" />
                <button type="submit">Add post</button>
            </Form>
        </Formik>
    );
}

export default AddPostForm;

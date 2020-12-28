import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { MyTextarea } from '../../common/MyFormikFields/MyFormikFields';

function AddPostForm(props) {
    return (
        <Formik
            initialValues={{
                newPostBody: '',
            }}
            validationSchema={Yup.object({
                newPostBody: Yup.string().max(10, 'Max post length is 10 symbols'),
            })}
            onSubmit={(values) => props.addPost(values.newPostBody)}
        >
            <Form>
                <MyTextarea name="newPostBody" placeholder="Введите текст поста" />
                <button type="submit">Add post</button>
            </Form>
        </Formik>
    );
}

export default AddPostForm;

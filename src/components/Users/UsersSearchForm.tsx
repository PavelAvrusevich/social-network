import { Field, Form, Formik } from 'formik';
import React from 'react';
import { FilterType } from '../../redux/users-reducer';

type PropsType = {
    filter: FilterType;
    onChangeFilter: (filter: FilterType) => void;
};

type FormType = {
    term: string;
    isFriend: 'null' | 'true' | 'false';
};

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (
        values: FormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        const filter: FilterType = {
            term: values.term,
            isFriend: values.isFriend === 'null' ? null : values.isFriend === 'false' ? false : true,
        };
        props.onChangeFilter(filter);
        setSubmitting(false);
    };
    return (
        <div>
            <Formik
                initialValues={{
                    term: '',
                    isFriend: 'null',
                }}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="isFriend" as="select">
                            <option value="null">all</option>
                            <option value="false">unfollowed</option>
                            <option value="true">followed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Применить фильтр
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
});

export default UsersSearchForm;

import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { saveProfile } from '../../../redux/profile-reducer';
import { ProfileType } from '../../../types/types';
import { MyCheckbox, MyTextarea, MyTextInput } from '../../common/MyFormikFields/MyFormikFields';
import s from './ProfileDataForm.module.css';

type PropsType = {
    initialValues: ProfileType;
    setEditMode: (param: boolean) => void;
};

type TDispatch = Parameters<ReturnType<typeof saveProfile>>[0];

const ProfileDataForm: React.FC<PropsType> = ({ initialValues, setEditMode }) => {
    const dispatch = useDispatch<TDispatch>();
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                fullName: Yup.string().required('Required'),
                aboutMe: Yup.string().required('Required'),
                lookingForAJobDescription: Yup.string().required('Required'),
            })}
            onSubmit={(values, { setStatus }) => {
                dispatch(saveProfile(values)).then(
                    () => {
                        setEditMode(false);
                    },
                    (status) => setStatus(status)
                );
            }}
        >
            {({ status }) => (
                <Form>
                    <MyTextInput name="fullName" placeholder="Full name" type="text" />
                    <MyTextInput name="aboutMe" placeholder="About me" type="text" />
                    <MyCheckbox name="lookingForAJob"> Looking for a job </MyCheckbox>
                    <MyTextarea name="lookingForAJobDescription" placeholder="About professional skills" />
                    <div className={s.contacts}>
                        <div>Contacts:</div>
                        {Object.keys(initialValues.contacts).map((key) => {
                            return (
                                <div key={key}>
                                    <MyTextInput name={'contacts.' + key} placeholder={key} type="text" />
                                </div>
                            );
                        })}
                    </div>
                    {status && <div className={s.formStatus}>{status}</div>}
                    <button type="submit">Save</button>
                </Form>
            )}
        </Formik>
    );
};

export default ProfileDataForm;

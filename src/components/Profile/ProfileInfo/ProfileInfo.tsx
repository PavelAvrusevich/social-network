import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './Status/ProfileStatus';
import userPhoto from '../../../assets/images/user.png';
import { ChangeEvent, useState } from 'react';
import ProfileDataForm from './ProfileDataForm';
import { ContactsType, ProfileType } from '../../../types/types';

type ProfileDataPropsType = {
    profile: ProfileType;
    isOwner: boolean;
    goToEditMode: (param: boolean) => void;
};

type ProfileInfoPropsType = {
    profile: ProfileType | null;
    status: string;
    updateStatus: (status: string) => void;
    isOwner: boolean;
    addAvatar: (file: File) => void;
    saveProfile: (profile: ProfileType) => Promise<any>;
};

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
    profile,
    status,
    updateStatus,
    isOwner,
    addAvatar,
    saveProfile,
}) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />;
    }

    const onMainProtoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            addAvatar(e.target.files[0]);
        }
    };

    return (
        <div className={s.content}>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
                {isOwner && <input type="file" onChange={onMainProtoSelected} />}
                <div>
                    <ProfileStatus status={status} updateStatus={updateStatus} />
                </div>
                {editMode ? (
                    <ProfileDataForm
                        initialValues={profile}
                        saveProfile={saveProfile}
                        setEditMode={setEditMode}
                    />
                ) : (
                    <ProfileData profile={profile} isOwner={isOwner} goToEditMode={setEditMode} />
                )}
            </div>
        </div>
    );
};

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
            {isOwner && <button onClick={() => goToEditMode(true)}>Edit</button>}
            <div>
                <b>Full name:</b> {profile.fullName}
            </div>
            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob}
            </div>
            <div>
                <b>Professional skills:</b> {profile.lookingForAJobDescription}
            </div>
            <div>
                <b>Contacts</b>:
                {Object.keys(profile.contacts).map((key) => {
                    return (
                        <Contact
                            key={key}
                            contactTitle={key}
                            contactValue={profile.contacts[key as keyof ContactsType]}
                        />
                    );
                })}
            </div>
        </div>
    );
};

type ContactPropsType = {
    contactTitle: string;
    contactValue: string;
};

const Contact: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    );
};

export default ProfileInfo;

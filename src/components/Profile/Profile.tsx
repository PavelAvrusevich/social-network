import React from 'react';
import { ProfileType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type ProfilePropsType = {
    profile: ProfileType | null;
    status: string;
    updateStatus: (status: string) => void;
    isOwner: boolean;
    addAvatar: (file: File) => void;
    saveProfile: (profile: ProfileType) => Promise<any>;
};

const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <div>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                addAvatar={props.addAvatar}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer />
        </div>
    );
};

export default Profile;

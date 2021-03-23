import React from 'react';
import { ProfileType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type ProfilePropsType = {
    isOwner: boolean;
};

const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner} />
            <MyPostsContainer />
        </div>
    );
};

export default Profile;

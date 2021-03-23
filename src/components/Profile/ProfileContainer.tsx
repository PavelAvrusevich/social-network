import React, { ComponentType, useEffect } from 'react';
import Profile from './Profile';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addProfile, getStatus, updateStatus, addAvatar, saveProfile } from '../../redux/profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { ProfileType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type PathParamsType = {
    userId: string;
};

type PropsType = RouteComponentProps<PathParamsType>;

const ProfileContainer: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch();

    const userIdFromState = useSelector((state: AppStateType) => state.auth.id);
    useEffect(() => refreshProfile(), [props.match.params.userId]);

    const refreshProfile = () => {
        let userId: number | null = +props.match.params.userId;
        if (!userId) {
            userId = userIdFromState;
        }
        if (!userId) {
            console.error('ID should be exist either in URI params or in state "userId"');
        } else {
            dispatch(addProfile(userId));
            dispatch(getStatus(userId));
        }
    };

    let isOwner = !props.match.params.userId;
    return <Profile isOwner={isOwner} />;
};

export default compose<ComponentType>(withRouter, withAuthRedirect)(ProfileContainer);

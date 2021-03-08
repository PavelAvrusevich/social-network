import React, { ComponentType } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { addProfile, getStatus, updateStatus, addAvatar, saveProfile } from '../../redux/profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { ProfileType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStateToProps = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    updateStatus: (status: string) => void;
    addAvatar: (file: File) => void;
    saveProfile: (profile: ProfileType) => Promise<any>;
    getStatus: (userId: number) => void;
    addProfile: (userId: number) => void;
};
type PathParamsType = {
    userId: string;
};

type PropsType = MapStateToProps & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.userId;
        }
        if (!userId) {
            console.error('ID should be exist either in URI params or in state "userId"');
        } else {
            this.props.addProfile(userId);
            this.props.getStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        let isOwner = !this.props.match.params.userId;
        return (
            <Profile
                isOwner={isOwner}
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                addAvatar={this.props.addAvatar}
                saveProfile={this.props.saveProfile}
            />
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.id,
});

export default compose<ComponentType>(
    connect(mapStateToProps, { addProfile, getStatus, updateStatus, addAvatar, saveProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

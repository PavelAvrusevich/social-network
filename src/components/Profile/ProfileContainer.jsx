import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { addProfile, getStatus, updateStatus, addAvatar } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.userId;
        }
        this.props.addProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState) {
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
            />
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.id,
});

export default compose(
    connect(mapStateToProps, { addProfile, getStatus, updateStatus, addAvatar }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

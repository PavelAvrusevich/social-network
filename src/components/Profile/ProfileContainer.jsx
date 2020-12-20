import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { addProfile, getStatus, updateStatus } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 13258;
        }
        this.props.addProfile(userId);
        this.props.getStatus(userId);
    }
    render() {
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
});

export default compose(
    connect(mapStateToProps, { addProfile, getStatus, updateStatus }),
    //withAuthRedirect,
    withRouter
)(ProfileContainer);

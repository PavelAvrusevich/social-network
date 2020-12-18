import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { addProfile } from '../../redux/profile-reducer';
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
    }
    render() {
        return <Profile {...this.props} profile={this.props.profile} />;
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

export default compose(
    connect(mapStateToProps, { addProfile }),
    withAuthRedirect,
    withRouter
)(ProfileContainer);

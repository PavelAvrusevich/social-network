import React from 'react';
import Profile from './Profile';
import * as axios from 'axios';
import { connect } from 'react-redux';
import { setProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 13258;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then((response) => {
            this.props.setProfile(response.data);
        });
    }
    render() {
        return <Profile {...this.props} profile={this.props.profile} />;
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

const mapDispatchToProps = (dispatch) => ({
    setProfile: (profile) => {
        dispatch(setProfile(profile));
    },
});

let withRouterComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(withRouterComponent);

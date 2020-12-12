import React from 'react';
import Profile from './Profile';
import * as axios from 'axios';
import { connect } from 'react-redux';
import setProfile from '../../redux/profile-reducer';

class ProfileContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then((response) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

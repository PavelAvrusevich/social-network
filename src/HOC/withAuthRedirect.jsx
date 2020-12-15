import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export let withAuthRedirect = (Component) => {
    class WithAuthRedirect extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to="/login" />;
            return <Component {...this.props} />;
        }
    }
    const mapStateToProps = (state) => ({
        isAuth: state.auth.isAuth,
    });
    return connect(mapStateToProps)(WithAuthRedirect);
};

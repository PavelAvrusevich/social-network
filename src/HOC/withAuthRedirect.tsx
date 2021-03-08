import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../redux/redux-store';

type MapStateToPropsType = {
    isAuth: boolean;
};
type MapDispatchToProps = {};

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const WithAuthRedirect: React.FC<MapDispatchToProps & MapStateToPropsType> = (props) => {
        let { isAuth, ...restProps } = props;
        if (!props.isAuth) return <Redirect to="/login" />;
        return <WrappedComponent {...(restProps as WCP)} />;
    };
    const mapStateToProps = (state: AppStateType) => ({
        isAuth: state.auth.isAuth,
    });
    return connect<MapStateToPropsType, MapDispatchToProps, WCP, AppStateType>(
        mapStateToProps,
        {}
    )(WithAuthRedirect);
}

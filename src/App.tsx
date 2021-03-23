import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Redirect, Route, withRouter } from 'react-router-dom';
import { UsersPage } from './components/Users/UsersPage';
import { LoginPage } from './components/Login/LoginPage';
import { initialize } from './redux/app-reducer';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store, { AppStateType } from './redux/redux-store';
import { withSuspense } from './HOC/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

type PropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    initialize: () => void;
};

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

class App extends React.Component<PropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initialize();
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader />;
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer />
                <Navbar />
                <div className="app-wrapper-content">
                    <Route exact path="/">
                        <Redirect to="/profile" />
                    </Route>
                    <Route path="/dialogs" render={() => <SuspendedDialogs />} />
                    <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
                    <Route path="/users" render={() => <UsersPage />} />
                    <Route path="/login" render={() => <LoginPage />} />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
});

const AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initialize }))(App);

const AppWithProvider = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    );
};

export default AppWithProvider;

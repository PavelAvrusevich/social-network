import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Redirect, Route, withRouter } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';
import { initialize } from './redux/app-reducer.ts';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import { withSuspense } from './HOC/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {
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
                    <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
                    <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
                    <Route path="/users" render={() => <UsersContainer />} />
                    <Route path="/login" render={() => <Login />} />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
});

const AppContainer = compose(withRouter, connect(mapStateToProps, { initialize }))(App);

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

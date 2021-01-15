import { applyMiddleware, combineReducers, createStore } from 'redux';
import authReducer from './auth-reducer';
import messageReducer from './message-reducer';
import navbarReducer from './navbar-reducer';
import profileReducer from './profile-reducer';
import usersReducer from './users-reducer';
import thunkMiddleware from 'redux-thunk';
import appReducer from './app-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: messageReducer,
    navbar: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

import { combineReducers, createStore } from 'redux';
import authReducer from './auth-reducer';
import messageReducer from './message-reducer';
import navbarReducer from './navbar-reducer';
import profileReducer from './profile-reducer';
import usersReducer from './users-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: messageReducer,
    navbar: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
});

let store = createStore(reducers);

export default store;

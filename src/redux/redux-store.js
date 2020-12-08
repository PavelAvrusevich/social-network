import { combineReducers, createStore } from 'redux';
import messageReducer from './message-reducer';
import navbarReducer from './navbar-reducer';
import profileReducer from './profile-reducer';
import usersReducer from './users-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: messageReducer,
    navbar: navbarReducer,
    usersPage: usersReducer,
});

let store = createStore(reducers);

export default store;

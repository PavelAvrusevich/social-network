import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import authReducer from './auth-reducer';
import messageReducer from './messages-reducer';
import navbarReducer from './navbar-reducer';
import profileReducer from './profile-reducer';
import usersReducer from './users-reducer';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import appReducer from './app-reducer';

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: messageReducer,
    navbar: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<
    PropertiesTypes<T>
>;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
//@ts-ignore
window.__store__ = store;

export default store;

import { authAPI } from '../api/api';

const SET_AUTH_DATA = 'ADD_AUTH_DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
};

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return { ...state, ...action.data };
        default:
            return state;
    }
};

export const setAuthData = (id, email, login, isAuth) => ({
    type: SET_AUTH_DATA,
    data: { id, email, login, isAuth },
});

export const getAuthData = () => (dispatch) => {
    authAPI.me().then((response) => {
        if (response.data.resultCode === 0) {
            let { id, email, login } = response.data.data;
            dispatch(setAuthData(id, email, login, true));
        }
    });
};

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe).then((response) => {
        if (response.data.resultCode === 0) {
            dispatch(getAuthData());
        }
    });
};

export const logout = (email, password, rememberMe) => (dispatch) => {
    authAPI.logout().then((response) => {
        if (response.data.resultCode === 0) {
            setAuthData(null, null, null, false);
        }
    });
};

export default authReducer;

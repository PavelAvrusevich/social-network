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
            return { ...state, ...action.data, isAuth: true };
        default:
            return state;
    }
};

export const setAuthData = (id, email, login) => ({ type: SET_AUTH_DATA, data: { id, email, login } });

export const getAuthData = () => (dispatch) => {
    authAPI.me().then((response) => {
        if (response.data.resultCode === 0) {
            let { id, email, login } = response.data.data;
            dispatch(setAuthData(id, email, login));
        }
    });
};

export default authReducer;

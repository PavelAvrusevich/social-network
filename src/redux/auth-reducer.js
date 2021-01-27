import { authAPI } from '../api/api';

const SET_AUTH_DATA = '/auth/ADD_AUTH_DATA';
const GET_CAPTCHA_URL_SUCCESED = '/auth/GET_CAPTCHA_URL_SUCCESED';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA:
        case GET_CAPTCHA_URL_SUCCESED:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const setAuthData = (id, email, login, isAuth, captchaUrl) => ({
    type: SET_AUTH_DATA,
    payload: { id, email, login, isAuth, captchaUrl },
});

export const getCaptchaUrlSuccesed = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESED,
    payload: { captchaUrl },
});

export const getAuthData = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthData(id, email, login, true, null));
    }
};

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await authAPI.getCaptchaUrl();
    dispatch(getCaptchaUrlSuccesed(response.data.url));
};

export const login = (email, password, rememberMe, captcha, setStatus) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthData());
    } else {
        if (response.data.resultCode === 10) {
            await dispatch(getCaptchaUrl());
        }
        let message = response.data.messages[0] || 'Some error';
        setStatus(message);
    }
};

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthData(null, null, null, false));
    }
};

export default authReducer;

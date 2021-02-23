import { ResultCodeForCaptchaEnum } from './../api/api';
import { authAPI, ResultCodeEnum } from '../api/api';

const SET_AUTH_DATA = '/auth/ADD_AUTH_DATA';
const GET_CAPTCHA_URL_SUCCESED = '/auth/GET_CAPTCHA_URL_SUCCESED';

export type InitialStateType = typeof initialState;

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null,
};

let authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_AUTH_DATA:
        case GET_CAPTCHA_URL_SUCCESED:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

type SetAuthDataActionPayloadType = {
    id: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
    captchaUrl: string | null;
};

type SetAuthDataActionType = {
    type: typeof SET_AUTH_DATA;
    payload: SetAuthDataActionPayloadType;
};

export const setAuthData = (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
): SetAuthDataActionType => ({
    type: SET_AUTH_DATA,
    payload: { id, email, login, isAuth, captchaUrl },
});

type GetCaptchaUrlSuccesedActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESED;
    payload: { captchaUrl: string };
};

export const getCaptchaUrlSuccesed = (captchaUrl: string): GetCaptchaUrlSuccesedActionType => ({
    type: GET_CAPTCHA_URL_SUCCESED,
    payload: { captchaUrl },
});

export const getAuthData = () => async (dispatch: any) => {
    let data = await authAPI.me();
    if (data.resultCode === ResultCodeEnum.Succes) {
        let { id, email, login } = data.data;
        dispatch(setAuthData(id, email, login, true, null));
    }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await authAPI.getCaptchaUrl();
    dispatch(getCaptchaUrlSuccesed(response.data.url));
};

export const login = (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null,
    setStatus: any
) => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodeEnum.Succes) {
        dispatch(getAuthData());
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl());
        }
        let message = data.messages[0] || 'Some error';
        setStatus(message);
    }
};

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthData(null, null, null, false, null));
    }
};

export default authReducer;

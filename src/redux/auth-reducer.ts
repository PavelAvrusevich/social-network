import { ResultCodeForCaptchaEnum } from '../api/api';
import { ResultCodeEnum } from '../api/api';
import { authAPI } from '../api/auth-api';
import { InferActionsTypes, BaseThunkType } from './redux-store';

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null,
};

let authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_AUTH_DATA':
        case 'SN/auth/GET_CAPTCHA_URL_SUCCESED':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

const actions = {
    getCaptchaUrlSuccesed: (captchaUrl: string) =>
        ({
            type: 'SN/auth/GET_CAPTCHA_URL_SUCCESED',
            payload: { captchaUrl },
        } as const),
    setAuthData: (
        id: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean,
        captchaUrl: string | null
    ) =>
        ({
            type: 'SN/auth/SET_AUTH_DATA',
            payload: { id, email, login, isAuth, captchaUrl },
        } as const),
};

export const getAuthData = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me();
    if (data.resultCode === ResultCodeEnum.Succes) {
        let { id, email, login } = data.data;
        dispatch(actions.setAuthData(id, email, login, true, null));
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let response = await authAPI.getCaptchaUrl();
    dispatch(actions.getCaptchaUrlSuccesed(response.url));
};

export const login = (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null,
    setStatus: any
): ThunkType => async (dispatch) => {
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

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthData(null, null, null, false, null));
    }
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
export type ThunkType = BaseThunkType<ActionsType>;

export default authReducer;

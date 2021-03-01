import { ResultCodeEnum, ResultCodeForCaptchaEnum, instance } from './api';

type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D;
    messages: Array<string>;
    resultCode: RC;
};

type LoginResponseDataType = {
    userId: number;
};

type MeResponseDataType = {
    id: number;
    email: string;
    login: string;
};

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`).then((res) => res.data);
    },
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null) {
        return instance
            .post<ResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(
                'auth/login',
                { email, password, rememberMe, captcha }
            )
            .then((res) => res.data);
    },
    logout() {
        return instance.delete('auth/login');
    },
};

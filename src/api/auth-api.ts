import { ResultCodeEnum, ResultCodeForCaptchaEnum, instance, ResponseType } from './api';

type LoginResponseDataType = {
    userId: number;
};

type MeResponseDataType = {
    id: number;
    email: string;
    login: string;
};

type GetCaptchaUrlResponseType = {
    url: string;
};

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`).then((res) => res.data);
    },
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`).then((res) => res.data);
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

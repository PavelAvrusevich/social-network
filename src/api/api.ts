import { ProfileType } from './../types/types';
import axios from 'axios';

let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'fa2a81d2-6200-470c-be70-671507ae68f0',
    },
});

export const userAPI = {
    getUsers(pageSize = 10, currentPage = 1) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`).then((responce) => responce.data);
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`);
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`);
    },
    getProfile(userId: number) {
        return profileAPI.getProfile(userId);
    },
};

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { status: status });
    },
    saveAvatar(file: any) {
        let formdata = new FormData();
        formdata.append('image', file);
        return instance.put(`profile/photo`, formdata, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        });
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile);
    },
};

type MeResponseType = {
    data: {
        id: number;
        email: string;
        login: string;
    };
    resultCode: ResultCodeEnum;
    messages: Array<string>;
};

export enum ResultCodeEnum {
    Succes = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10,
}

type LoginResponseType = {
    data: {
        userId: number;
    };
    resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum;
    messages: Array<string>;
};

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then((res) => res.data);
    },
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha?: string) {
        return instance
            .post<LoginResponseType>('auth/login', { email, password, rememberMe, captcha })
            .then((res) => res.data);
    },
    logout() {
        return instance.delete('auth/login');
    },
};

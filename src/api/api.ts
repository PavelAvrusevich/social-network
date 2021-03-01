import { UserType } from './../types/types';
import axios from 'axios';

export let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'fa2a81d2-6200-470c-be70-671507ae68f0',
    },
});

export enum ResultCodeEnum {
    Succes = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10,
}

export type GetItemsType = {
    items: Array<UserType>;
    totalCount: number;
    error: string | null;
};

import { ProfileType } from '../types/types';
import { instance } from './api';

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

import { PhotosType, ProfileType } from './../types/types';
import { instance, ResponseType } from './api';

type SaveAvatarResponseType = {
    photos: PhotosType;
};

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then((res) => res.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then((res) => res.data);
    },
    updateStatus(status: string) {
        return instance
            .put<ResponseType>(`profile/status`, { status: status })
            .then((res) => res.data);
    },
    saveAvatar(file: File) {
        let formdata = new FormData();
        formdata.append('image', file);
        return instance
            .put<ResponseType<SaveAvatarResponseType>>(`profile/photo`, formdata, {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            })
            .then((res) => res.data);
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile).then((res) => res.data);
    },
};

import { userAPI, profileAPI } from '../api/api';
import { PostType, PhotosType, ProfileType } from '../types/types';

const ADD_POST = 'ADD-POST';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_AVATAR = 'SET_AVATAR';

let initialState = {
    posts: [
        { id: 1, message: 'привет, как дела??', likesCount: 12 },
        { id: 2, message: 'Я ждун))', likesCount: 10 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
};

export type InitialStateType = typeof initialState;

let profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, { id: 3, message: action.newPostBody, likesCount: 0 }],
            };
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile,
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            };
        case SET_AVATAR:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType,
            };
        default:
            return state;
    }
};

type AddPostActionType = {
    type: typeof ADD_POST;
    newPostBody: string;
};
export const addPost = (newPostBody: string): AddPostActionType => ({ type: ADD_POST, newPostBody });
type SetProfileActionType = {
    type: typeof SET_PROFILE;
    profile: ProfileType;
};
export const setProfile = (profile: ProfileType): SetProfileActionType => ({ type: SET_PROFILE, profile });
type SetStatusActionType = {
    type: typeof SET_STATUS;
    status: string;
};
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });
type SetAvatarActionType = {
    type: typeof SET_AVATAR;
    photos: PhotosType;
};
export const setAvatar = (photos: PhotosType): SetAvatarActionType => ({ type: SET_AVATAR, photos });

export const getStatus = (userId: number) => {
    return async (dispatch: any) => {
        let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
    };
};

export const updateStatus = (status: string) => {
    return async (dispatch: any) => {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    };
};

export const addProfile = (userId: number) => {
    return async (dispatch: any) => {
        let response = await profileAPI.getProfile(userId);
        dispatch(setProfile(response.data));
    };
};

export const saveProfile = (profile: ProfileType, setStatus: any) => {
    return async (dispatch: any, getState: any) => {
        const userId = getState().auth.id;
        let response = await profileAPI.saveProfile(profile);
        if (response.data.resultCode === 0) {
            dispatch(addProfile(userId));
        } else {
            return Promise.reject(response.data.messages);
        }
    };
};

export const addAvatar = (file: any) => {
    return async (dispatch: any) => {
        let response = await profileAPI.saveAvatar(file);
        if (response.data.resultCode === 0) {
            dispatch(setAvatar(response.data.data.photos));
        }
    };
};

export default profileReducer;

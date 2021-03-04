import { profileAPI } from '../api/profile-api';
import { PostType, PhotosType, ProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';

let initialState = {
    posts: [
        { id: 1, message: 'привет, как дела??', likesCount: 12 },
        { id: 2, message: 'Я ждун))', likesCount: 10 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
};

let profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD_POST':
            return {
                ...state,
                posts: [...state.posts, { id: 3, message: action.newPostBody, likesCount: 0 }],
            };
        case 'SN/PROFILE/SET_PROFILE':
            return {
                ...state,
                profile: action.profile,
            };
        case 'SN/PROFILE/SET_STATUS':
            return {
                ...state,
                status: action.status,
            };
        case 'SN/PROFILE/SET_AVATAR':
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType,
            };
        default:
            return state;
    }
};

export const actions = {
    addPost: (newPostBody: string) => ({ type: 'SN/PROFILE/ADD_POST', newPostBody } as const),
    setProfile: (profile: ProfileType) => ({ type: 'SN/PROFILE/SET_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SN/PROFILE/SET_STATUS', status } as const),
    setAvatar: (photos: PhotosType) => ({ type: 'SN/PROFILE/SET_AVATAR', photos } as const),
};

export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId);
        dispatch(actions.setStatus(response));
    };
};

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status);
        if (response.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    };
};

export const addProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.getProfile(userId);
        dispatch(actions.setProfile(response));
    };
};

export const saveProfile = (profile: ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.id;
        let response = await profileAPI.saveProfile(profile);
        if (response.resultCode === 0) {
            if (userId != null) {
                dispatch(addProfile(userId));
            } else {
                throw new Error("userId can't be null");
            }
        } else {
            return Promise.reject(response.messages);
        }
    };
};

export const addAvatar = (file: File): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.saveAvatar(file);
        if (response.resultCode === 0) {
            dispatch(actions.setAvatar(response.data.photos));
        }
    };
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

export default profileReducer;

import { userAPI, profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_AVATAR = 'SET_AVATAR';

let initialState = {
    posts: [
        { id: '1', message: 'привет, как дела??', likesCount: 12 },
        { id: '2', message: 'Я ждун))', likesCount: 10 },
    ],
    profile: null,
    status: '',
};

let profileReducer = (state = initialState, action) => {
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
                profile: { ...state.profile, photos: { ...action.photos } },
            };
        default:
            return state;
    }
};

export const addPost = (newPostBody) => ({ type: ADD_POST, newPostBody });
export const setProfile = (profile) => ({ type: SET_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const setAvatar = (photos) => ({ type: SET_AVATAR, photos });

export const getStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
    };
};

export const updateStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    };
};

export const addProfile = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getProfile(userId);
        dispatch(setProfile(response.data));
    };
};

export const saveProfile = (profile, setStatus) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.id;
        let response = await profileAPI.saveProfile(profile);
        if (response.data.resultCode === 0) {
            dispatch(addProfile(userId));
        } else {
            return Promise.reject(response.data.messages);
        }
    };
};

export const addAvatar = (file) => {
    return async (dispatch) => {
        let response = await profileAPI.saveAvatar(file);
        if (response.data.resultCode === 0) {
            dispatch(setAvatar(response.data.data.photos));
        }
    };
};

export default profileReducer;

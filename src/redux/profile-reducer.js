import { userAPI, profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        { id: '1', message: 'привет, как дела??', likesCount: 12 },
        { id: '2', message: 'Я ждун))', likesCount: 10 },
    ],
    newText: '',
    profile: null,
    status: '',
};

let profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_POST_TEXT:
            return { ...state, newText: action.newText };
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, { id: 3, message: state.newText, likesCount: 0 }],
                newText: '',
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
        default:
            return state;
    }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
});
export const setProfile = (profile) => ({ type: SET_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then((response) => {
            dispatch(setStatus(response.data));
        });
    };
};

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
    };
};

export const addProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getProfile(userId).then((response) => {
            dispatch(setProfile(response.data));
        });
    };
};

export default profileReducer;

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_PROFILE = 'SET_PROFILE';

let initialState = {
    posts: [
        { id: '1', message: 'привет, как дела??', likesCount: 12 },
        { id: '2', message: 'Я ждун))', likesCount: 10 },
    ],
    newText: '',
    profile: null,
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

export default profileReducer;

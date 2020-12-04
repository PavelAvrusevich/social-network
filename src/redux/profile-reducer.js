const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let profileReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_NEW_POST_TEXT:
            state.newText = action.newText;
            return state;
        case ADD_POST:
            let newPost = {
                id: 3,
                message: state.newText,
                likesCount: 0,
            };
            state.posts.push(newPost);
            state.newText = '';
            return state;
        default:
            return state;
    }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
});

export default profileReducer;

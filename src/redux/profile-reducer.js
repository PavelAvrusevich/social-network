const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        { id: '1', message: 'привет, как дела??', likesCount: 12 },
        { id: '2', message: 'Я ждун))', likesCount: 10 },
    ],
    newText: '',
};

let profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = { ...state };
            stateCopy.newText = action.newText;
            return stateCopy;
        }
        case ADD_POST: {
            let stateCopy = { ...state };
            let newPost = {
                id: 3,
                message: stateCopy.newText,
                likesCount: 0,
            };
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            stateCopy.newText = '';
            return stateCopy;
        }
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

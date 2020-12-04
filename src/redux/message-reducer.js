const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';

let initialState = {
    dialogs: [
        { id: '1', name: 'Серега' },
        { id: '2', name: 'Вован' },
        { id: '3', name: 'Силос' },
    ],
    messages: [
        { id: '1', message: 'message 1' },
        { id: '2', message: 'message 2' },
        { id: '3', message: 'message 121' },
    ],
    newText: '',
};

let messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newText = action.newText;
            return state;
        case SEND_MESSAGE:
            let message = {
                id: '4',
                message: state.newText,
            };
            state.messages.push(message);
            state.newText = '';
            return state;
        default:
            return state;
    }
};

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageTextCreator = (text) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newText: text,
});

export default messageReducer;

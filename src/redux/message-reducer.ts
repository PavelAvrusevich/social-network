const SEND_MESSAGE = 'SEND_MESSAGE';

type DialogType = {
    id: string;
    name: string;
};

type MessageType = {
    id: string;
    message: string;
};

let initialState = {
    dialogs: [
        { id: '1', name: 'Серега' },
        { id: '2', name: 'Вован' },
        { id: '3', name: 'Силос' },
    ] as Array<DialogType>,
    messages: [
        { id: '1', message: 'message 1' },
        { id: '2', message: 'message 2' },
        { id: '3', message: 'message 121' },
    ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;

let messageReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        id: '4',
                        message: action.newMessageBody,
                    },
                ],
            };
        }
        default:
            return state;
    }
};

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE;
    newMessageBody: string;
};

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({
    type: SEND_MESSAGE,
    newMessageBody,
});

export default messageReducer;

import { InferActionsTypes } from './redux-store';

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

let messageReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/MESSAGES/SEND_MESSAGE': {
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

export const actions = {
    sendMessage: (newMessageBody: string) =>
        ({
            type: 'SN/MESSAGES/SEND_MESSAGE',
            newMessageBody,
        } as const),
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

export default messageReducer;

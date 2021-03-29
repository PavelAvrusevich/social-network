import { ChatMessageTypeApi, chatAPI, StatusType } from './../api/chat-api';
import { ResultCodeForCaptchaEnum } from '../api/api';
import { ResultCodeEnum } from '../api/api';
import { authAPI } from '../api/auth-api';
import { InferActionsTypes, BaseThunkType } from './redux-store';
import { Dispatch } from 'redux';
import { message } from 'antd';
import { v1 } from 'uuid';

export type ChatMessageType = ChatMessageTypeApi & { id: string };

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType,
};

let chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/chat/MESSAGE_RECEIVED':
            return {
                ...state,
                messages: [
                    ...state.messages,
                    ...action.payload.messages.map((m) => ({ ...m, id: v1() })),
                ].filter((m, index, array) => index >= array.length - 100),
            };
        case 'SN/chat/STATUS_CHANGED':
            return { ...state, status: action.payload.status };
        default:
            return state;
    }
};

const actions = {
    messageReceived: (messages: ChatMessageTypeApi[]) =>
        ({
            type: 'SN/chat/MESSAGE_RECEIVED',
            payload: { messages },
        } as const),
    statusChanged: (status: StatusType) =>
        ({
            type: 'SN/chat/STATUS_CHANGED',
            payload: { status },
        } as const),
};

let _newMessageHandlerCreator: ((messages: ChatMessageTypeApi[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandlerCreator === null) {
        _newMessageHandlerCreator = (messages) => {
            dispatch(actions.messageReceived(messages));
        };
    }
    return _newMessageHandlerCreator;
};

let _statusHandlerCreator: ((status: StatusType) => void) | null = null;
const statusHandlerCreator = (dispatch: Dispatch) => {
    if (_statusHandlerCreator === null) {
        _statusHandlerCreator = (status) => {
            dispatch(actions.statusChanged(status));
        };
    }
    return _statusHandlerCreator;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', statusHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe('status-changed', statusHandlerCreator(dispatch));
    chatAPI.stop();
};

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message);
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
export type ThunkType = BaseThunkType<ActionsType>;

export default chatReducer;

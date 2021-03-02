import { InferActionsTypes } from './redux-store';
import { run } from 'jest';
import { profileAPI } from '../api/profile-api';
import { userAPI } from '../api/user-api';
import { getAuthData } from './auth-reducer';

let initialState = {
    initialized: false,
};

export type InitialStateType = typeof initialState;
export type ActionsType = InferActionsTypes<typeof actions>;

let appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCES':
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

export const actions = {
    initializedSucces: () => ({ type: 'SN/APP/INITIALIZED_SUCCES' } as const),
};

export const initialize = () => (dispatch: any) => {
    let promise = dispatch(getAuthData());
    promise.then(() => dispatch(actions.initializedSucces()));
};

export default appReducer;

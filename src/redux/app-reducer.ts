import { run } from 'jest';
import { profileAPI } from '../api/profile-api';
import { userAPI } from '../api/user-api';
import { getAuthData } from './auth-reducer';

const INITIALIZED_SUCCES = 'INITIALIZED_SUCCES';

export type InitialStateType = {
    initialized: boolean;
};

let initialState: InitialStateType = {
    initialized: false,
};

let appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCES:
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

type InitializedSuccesActionType = {
    type: typeof INITIALIZED_SUCCES;
};

export const initializedSucces = (): InitializedSuccesActionType => ({ type: INITIALIZED_SUCCES });

export const initialize = () => (dispatch: any) => {
    let promise = dispatch(getAuthData());
    promise.then(() => dispatch(initializedSucces()));
};

export default appReducer;

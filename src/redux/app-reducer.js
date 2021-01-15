import { userAPI, profileAPI } from '../api/api';
import { getAuthData } from './auth-reducer';

const INITIALIZED_SUCCES = 'INITIALIZED_SUCCES';

let initialState = {
    initialized: false,
};

let appReducer = (state = initialState, action) => {
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

export const initializedSucces = () => ({ type: INITIALIZED_SUCCES });

export const initialize = () => (dispatch) => {
    let promise = dispatch(getAuthData());
    promise.then(() => dispatch(initializedSucces()));
};

export default appReducer;

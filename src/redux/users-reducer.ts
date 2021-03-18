import { InferActionsTypes, BaseThunkType } from './redux-store';
import { UserType } from './../types/types';
import { userAPI } from '../api/user-api';
import { updateObjectInArray } from '../utils/object-helpers';
import { Dispatch } from 'redux';

let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 8,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users id
};

let usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.id, { followed: true }),
            };
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.id, { followed: false }),
            };
        case 'SN/USERS/SET_USERS':
            return {
                ...state,
                users: action.users,
            };
        case 'SN/USERS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.page,
            };
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.count,
            };
        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter((id) => id !== action.id),
            };
        default:
            return state;
    }
};

export const actions = {
    followSuccess: (id: number) => ({ type: 'SN/USERS/FOLLOW', id: id } as const),
    unfollowSuccess: (id: number) => ({ type: 'SN/USERS/UNFOLLOW', id: id } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
    setCurrentPage: (page: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', page } as const),
    setTotalUsersCount: (count: number) =>
        ({
            type: 'SN/USERS/SET_TOTAL_USERS_COUNT',
            count,
        } as const),
    toggleIsFetching: (isFetching: boolean) =>
        ({
            type: 'SN/USERS/TOGGLE_IS_FETCHING',
            isFetching,
        } as const),
    toggleFollowingProgress: (followingInProgress: boolean, id: number) =>
        ({
            type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
            followingInProgress,
            id,
        } as const),
};

export const getUsers = (pageSize: number, currentPage: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        let data = await userAPI.getUsers(pageSize, currentPage);
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    };
};

let _followUnfollowFlow = async (
    dispatch: DispatchType,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => ActionsTypes
) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        await _followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), actions.followSuccess);
    };
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        await _followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), actions.unfollowSuccess);
    };
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = BaseThunkType<ActionsTypes>;

export default usersReducer;

import { AppStateType, InferActionsTypes, PropertiesTypes } from './redux-store';
import { UserType } from './../types/types';
import { userAPI } from '../api/user-api';
import { updateObjectInArray } from '../utils/object-helpers';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 8,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users id
};

export type InitialStateType = typeof initialState;

let usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.id, { followed: true }),
            };
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.id, { followed: false }),
            };
        case 'SET_USERS':
            return {
                ...state,
                users: action.users,
            };
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.page,
            };
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.count,
            };
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    followSuccess: (id: number) => ({ type: 'FOLLOW', id: id } as const),
    unfollowSuccess: (id: number) => ({ type: 'UNFOLLOW', id: id } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (page: number) => ({ type: 'SET_CURRENT_PAGE', page } as const),
    setTotalUsersCount: (count: number) =>
        ({
            type: 'SET_TOTAL_USERS_COUNT',
            count,
        } as const),
    toggleIsFetching: (isFetching: boolean) =>
        ({
            type: 'TOGGLE_IS_FETCHING',
            isFetching,
        } as const),
    toggleFollowingProgress: (followingInProgress: boolean, id: number) =>
        ({
            type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
            followingInProgress,
            id,
        } as const),
};

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getUsers = (pageSize: number, currentPage: number): ThunkType => {
    return async (dispatch: DispatchType, getState) => {
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
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        _followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), actions.followSuccess);
    };
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        _followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), actions.unfollowSuccess);
    };
};

export default usersReducer;

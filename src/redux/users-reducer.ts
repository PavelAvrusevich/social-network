import { AppStateType } from './redux-store';
import { UserType } from './../types/types';
import { userAPI } from '../api/api';
import { updateObjectInArray } from '../utils/object-helpers';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 8,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users id
};

export type InitialStateType = typeof initialState;

let usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.id, { followed: true }),
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.id, { followed: false }),
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page,
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count,
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
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

type FollowSuccessActionType = {
    type: typeof FOLLOW;
    id: number;
};
export const followSuccess = (id: number): FollowSuccessActionType => ({ type: FOLLOW, id: id });
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW;
    id: number;
};
export const unfollowSuccess = (id: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, id: id });
type SetUsersActionType = {
    type: typeof SET_USERS;
    users: Array<UserType>;
};
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE;
    page: number;
};
export const setCurrentPage = (page: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, page });
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT;
    count: number;
};
export const setTotalUsersCount = (count: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    count,
});
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING;
    isFetching: boolean;
};
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
});
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
    followingInProgress: boolean;
    id: number;
};
export const toggleFollowingProgress = (
    followingInProgress: boolean,
    id: number
): ToggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress,
    id,
});

type ActionTypes =
    | FollowSuccessActionType
    | UnfollowSuccessActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | ToggleIsFetchingActionType
    | ToggleFollowingProgressActionType;

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getUsers = (pageSize: number, currentPage: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true));
        let data = await userAPI.getUsers(pageSize, currentPage);
        dispatch(setUsers(data.items));
        dispatch(setCurrentPage(currentPage));
        dispatch(toggleIsFetching(false));
        dispatch(setTotalUsersCount(data.totalCount));
    };
};

let _followUnfollowFlow = async (
    dispatch: DispatchType,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType
) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followSuccess);
    };
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSuccess);
    };
};

export default usersReducer;

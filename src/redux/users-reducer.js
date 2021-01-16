import { userAPI } from '../api/api';
import { updateObjectInArray } from '../utils/object-helpers';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    totalUsersCount: 0,
    pageSize: 8,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
};

let usersReducer = (state = initialState, action) => {
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

export const followSuccess = (id) => ({ type: FOLLOW, id: id });
export const unfollowSuccess = (id) => ({ type: UNFOLLOW, id: id });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page });
export const setTotalUsersCount = (count) => ({ type: SET_TOTAL_USERS_COUNT, count });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (followingInProgress, id) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress,
    id,
});

export const getUsers = (pageSize, currentPage) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await userAPI.getUsers(pageSize, currentPage);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    };
};

let followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followSuccess);
    };
};

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSuccess);
    };
};

export default usersReducer;

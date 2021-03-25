import { AppStateType } from './redux-store';
import { createSelector } from 'reselect';

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
};

export const getUsersReselect = createSelector(getUsersSelector, (users) => {
    return users.filter((u) => true);
});

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
};

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
};

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
};

export const getFilter = (state: AppStateType) => {
    return state.usersPage.filter;
};

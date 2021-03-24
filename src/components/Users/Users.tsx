import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCurrentPage,
    getFilter,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersReselect,
} from '../../redux/selectors';
import { FilterType, follow, getUsers, unfollow } from '../../redux/users-reducer';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import UsersSearchForm from './UsersSearchForm';
import { useHistory } from 'react-router';
import * as queryString from 'querystring';
// reload of page works incorrect.
type PropsType = {};
type QueryParamsType = {
    term?: string;
    friend?: string;
    page?: string;
};

let Users: FC<PropsType> = (props) => {
    const dispatch = useDispatch();
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const filter = useSelector(getFilter);
    const users = useSelector(getUsersReselect);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const followingInProgress = useSelector(getFollowingInProgress);
    const onChangeFilter = (filter: FilterType) => {
        dispatch(getUsers(pageSize, 1, filter));
    };
    const onChangePage = (p: number) => {
        dispatch(getUsers(pageSize, p, filter));
    };

    const history = useHistory();
    const search = history.location.search;

    useEffect(() => {
        const parsedParams = queryString.parse(search.substring(1));
        let { term, friend, page } = parsedParams;
        const filterFromString = {
            term: term ? term : filter.term,
            isFriend: friend === 'true' ? true : friend === 'false' ? false : filter.isFriend,
        };
        let pageNumber = !!page ? Number(page) : currentPage;
        dispatch(getUsers(pageSize, pageNumber, filterFromString as FilterType));
    }, []);

    useEffect(() => {
        let { term, isFriend } = filter;
        const queryParams: QueryParamsType = {};
        if (term) {
            queryParams.term = term;
        }
        if (isFriend !== null) queryParams.friend = String(isFriend);
        if (currentPage !== 1) {
            queryParams.page = String(currentPage);
        }
        history.push({ pathname: '/users', search: queryString.stringify(queryParams) });
    }, [filter, currentPage]);

    return (
        <div>
            <UsersSearchForm onChangeFilter={onChangeFilter} />
            <Paginator
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onChangePage={onChangePage}
            />
            <div>
                {users.map((u) => (
                    <User
                        user={u}
                        followingInProgress={followingInProgress}
                        follow={follow}
                        unfollow={unfollow}
                    />
                ))}
            </div>
        </div>
    );
};

export default Users;

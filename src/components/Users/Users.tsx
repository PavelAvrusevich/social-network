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

type PropsType = {};
type parametersObjType = {
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
    useEffect(() => {
        dispatch(getUsers(pageSize, currentPage, filter));
    }, []);

    const history = useHistory();
    const search = history.location.search;

    useEffect(() => {
        const params = queryString.parse(search.substring(1));
        const { term, friend, page } = params;
        const filter = {
            term: term ? term : '',
            isFriend: friend === 'true' ? true : friend === 'false' ? false : null,
        };
        dispatch(getUsers(pageSize, Number(page), filter as FilterType));
    }, []);

    useEffect(() => {
        let { term, isFriend } = filter;
        const parametersObj: parametersObjType = {};
        if (term) {
            parametersObj.term = term;
        }
        let friend: string | undefined;
        switch (isFriend) {
            case null:
                break;
            case true:
                friend = 'true';
                break;
            case false:
                friend = 'false';
                break;
        }
        if (friend) {
            parametersObj.friend = friend;
        }
        if (currentPage !== 1) {
            parametersObj.page = String(currentPage);
        }
        const paramsString = '?' + queryString.stringify(parametersObj);
        history.push({ pathname: '/users', search: paramsString });
    }, [filter, currentPage]);

    return (
        <div>
            <UsersSearchForm filter={filter} onChangeFilter={onChangeFilter} />
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

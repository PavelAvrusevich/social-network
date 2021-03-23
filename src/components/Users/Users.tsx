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

type PropsType = {};

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

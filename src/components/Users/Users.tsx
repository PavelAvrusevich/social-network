import React, { FC } from 'react';
import { UserType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

type Props = {
    totalUsersCount: number;
    pageSize: number;
    currentPage: number;
    onChangePage: (pageNumber: number) => void;
    users: Array<UserType>;
    followingInProgress: Array<number>;
    follow: () => void;
    unfollow: () => void;
};

let Users: FC<Props> = ({ totalUsersCount, pageSize, currentPage, onChangePage, users, ...props }) => {
    return (
        <div>
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
                        followingInProgress={props.followingInProgress}
                        follow={props.follow}
                        unfollow={props.unfollow}
                    />
                ))}
            </div>
        </div>
    );
};

export default Users;

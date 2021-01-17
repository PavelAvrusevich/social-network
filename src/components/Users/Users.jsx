import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

let Users = ({
    totalUsersCount,
    pageSize,
    currentPage,
    onChangePage,
    users,
    followingInProgress,
    ...props
}) => {
    return (
        <div>
            <Paginator
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onChangePage={onChangePage}
            />
            <div>
                {users.map((u) => (
                    <User
                        user={u}
                        followingInProgress={followingInProgress}
                        follow={props.follow}
                        unfollow={props.unfollow}
                    />
                ))}
            </div>
        </div>
    );
};

export default Users;

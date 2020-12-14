import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import * as axios from 'axios';

let Users = (props) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            <div>
                {pages.map((p) => {
                    return (
                        <span
                            className={props.currentPage === p && styles.currentPage}
                            onClick={() => props.onChangePage(p)}
                        >
                            {p}
                        </span>
                    );
                })}
            </div>
            {props.users.map((u) => (
                <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={`/profile/${u.id}`}>
                                <img
                                    className={styles.userPhoto}
                                    src={u.photos.small != null ? u.photos.small : userPhoto}
                                />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed === false ? (
                                <button
                                    disabled={props.followingInProgress.some((id) => id === u.id)}
                                    onClick={() => {
                                        props.toggleFollowingProgress(true, u.id);
                                        axios
                                            .post(
                                                `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                                {},
                                                {
                                                    withCredentials: true,
                                                    headers: {
                                                        'API-KEY': 'fa2a81d2-6200-470c-be70-671507ae68f0',
                                                    },
                                                }
                                            )
                                            .then((response) => {
                                                if (response.data.resultCode == 0) {
                                                    props.follow(u.id);
                                                }
                                                props.toggleFollowingProgress(false, u.id);
                                            });
                                    }}
                                >
                                    follow
                                </button>
                            ) : (
                                <button
                                    disabled={props.followingInProgress.some((id) => id === u.id)}
                                    onClick={() => {
                                        props.toggleFollowingProgress(true, u.id);
                                        axios
                                            .delete(
                                                `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                                {
                                                    withCredentials: true,
                                                    headers: {
                                                        'API-KEY': 'fa2a81d2-6200-470c-be70-671507ae68f0',
                                                    },
                                                }
                                            )
                                            .then((response) => {
                                                if (response.data.resultCode == 0) {
                                                    props.unfollow(u.id);
                                                }
                                                props.toggleFollowingProgress(false, u.id);
                                            });
                                    }}
                                >
                                    unfollow
                                </button>
                            )}
                        </div>
                    </span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Users;

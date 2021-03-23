import React from 'react';
import styles from './User.module.css';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType = {
    user: UserType;
    followingInProgress: Array<number>;
    unfollow: (userId: number) => void;
    follow: (userId: number) => void;
};

const User: React.FC<PropsType> = ({ user, followingInProgress, follow, unfollow }) => {
    return (
        <div key={user.id}>
            <span>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                        <img
                            className={styles.userPhoto}
                            src={user.photos.small != null ? user.photos.small : userPhoto}
                        />
                    </NavLink>
                </div>
                <div>
                    {user.followed === false ? (
                        <button
                            disabled={followingInProgress.some((id) => id === user.id)}
                            onClick={() => {
                                follow(user.id);
                            }}
                        >
                            follow
                        </button>
                    ) : (
                        <button
                            disabled={followingInProgress.some((id) => id === user.id)}
                            onClick={() => {
                                unfollow(user.id);
                            }}
                        >
                            unfollow
                        </button>
                    )}
                </div>
            </span>
            <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </span>
            <span>
                <div>{'u.location.country'}</div>
                <div>{'u.location.city'}</div>
            </span>
        </div>
    );
};

export default User;

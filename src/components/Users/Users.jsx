import * as axios from 'axios';
import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.png';

function Users(props) {
    if (props.users.length === 0) {
        axios
            .get('https://social-network.samuraijs.com/api/1.0/users')
            .then((response) => {
                props.setUsers(response.data.items);
            });
    }

    return (
        <div>
            {props.users.map((u) => (
                <div key={u.id}>
                    <span>
                        <div>
                            <img
                                className={styles.userPhoto}
                                src={
                                    u.photos.small != null
                                        ? u.photos.small
                                        : userPhoto
                                }
                            />
                        </div>
                        <div>
                            {u.followed === false ? (
                                <button onClick={() => props.follow(u.id)}>
                                    follow
                                </button>
                            ) : (
                                <button onClick={() => props.unfollow(u.id)}>
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
}

export default Users;

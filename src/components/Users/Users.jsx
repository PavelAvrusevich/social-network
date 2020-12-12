import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';

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
                        <span className={props.currentPage === p && styles.currentPage} onClick={() => props.onChangePage(p)}>
                            {p}
                        </span>
                    );
                })}
            </div>
            {props.users.map((u) => (
                <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to="/profile">
                                <img className={styles.userPhoto} src={u.photos.small != null ? u.photos.small : userPhoto} />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed === false ? (
                                <button onClick={() => props.follow(u.id)}>follow</button>
                            ) : (
                                <button onClick={() => props.unfollow(u.id)}>unfollow</button>
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

import React from 'react';
import styles from './Users.module.css';

function Users(props) {
    if (props.users.length === 0) {
        let users = [
            {
                id: 1,
                photoUrl:
                    'https://citydog.by/content/_posts/442X361/5e2c4f627a5bc.jpeg',
                fullName: 'Pavel',
                status: 'learning react',
                followed: true,
                location: { city: 'Minsk', country: 'Belarus' },
            },
            {
                id: 2,
                photoUrl:
                    'https://citydog.by/content/_posts/442X361/5e2c4f627a5bc.jpeg',
                fullName: 'Andrew',
                status: 'learning angular',
                followed: true,
                location: { city: 'Moscow', country: 'Russia' },
            },
            {
                id: 3,
                photoUrl:
                    'https://citydog.by/content/_posts/442X361/5e2c4f627a5bc.jpeg',
                fullName: 'Jack',
                status: 'learning vue',
                followed: false,
                location: { city: 'Denver', country: 'USA' },
            },
        ];
        props.setUsers(users);
    }

    return (
        <div>
            {props.users.map((u) => (
                <div key={u.id}>
                    <span>
                        <div>
                            <img
                                className={styles.userPhoto}
                                src={u.photoUrl}
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
                        <div>{u.fullname}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Users;

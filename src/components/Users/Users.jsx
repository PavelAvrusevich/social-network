import * as axios from 'axios';
import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.png';

class Users extends React.Component {
    constructor(props) {
        super(props);
    }

    setState() {
        axios
            .get('https://social-network.samuraijs.com/api/1.0/users')
            .then((response) => {
                this.props.setUsers(response.data.items);
            });
    }

    render() {
        return (
            <div>
                <button onClick={() => this.setState()}>показать</button>
                {this.props.users.map((u) => (
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
                                    <button
                                        onClick={() => this.props.follow(u.id)}
                                    >
                                        follow
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            this.props.unfollow(u.id)
                                        }
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
    }
}

export default Users;

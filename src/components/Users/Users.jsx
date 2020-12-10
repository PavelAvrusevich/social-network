import * as axios from 'axios';
import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import { setCurrentPageAC } from '../../redux/users-reducer';

class Users extends React.Component {
    componentDidMount() {
        axios
            .get(
                `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`
            )
            .then((response) => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onChangePage = (p) => {
        this.props.setCurrentPage(p);
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${p}`)
            .then((response) => {
                this.props.setUsers(response.data.items);
            });
    };

    render() {
        let pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
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
                                className={this.props.currentPage === p && styles.currentPage}
                                onClick={() => this.onChangePage(p)}
                            >
                                {p}
                            </span>
                        );
                    })}
                </div>
                {this.props.users.map((u) => (
                    <div key={u.id}>
                        <span>
                            <div>
                                <img
                                    className={styles.userPhoto}
                                    src={u.photos.small != null ? u.photos.small : userPhoto}
                                />
                            </div>
                            <div>
                                {u.followed === false ? (
                                    <button onClick={() => this.props.follow(u.id)}>follow</button>
                                ) : (
                                    <button onClick={() => this.props.unfollow(u.id)}>unfollow</button>
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

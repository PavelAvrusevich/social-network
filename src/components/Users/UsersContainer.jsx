import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersReselect,
} from '../../redux/selectors';
import { follow, setCurrentPage, unfollow, getUsers } from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

//take working with server out the presentation component
// side effects (working with server) take out in lifecicle method

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage);
    }

    //set current page from parametrs, not from props. This state property may not to update yet.

    onChangePage = (p) => {
        this.props.getUsers(this.props.pageSize, p);
    };

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    onChangePage={this.onChangePage}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    users: getUsersReselect(state),
    totalUsersCount: getTotalUsersCount(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
});

/*const mapDispatchToProps = (dispatch) => ({
    follow: (id) => {
        dispatch(followAC(id));
    },
    unfollow: (id) => {
        dispatch(unfollowAC(id));
    },
    setUsers: (users) => {
        dispatch(setUsersAC(users));
    },
    setCurrentPage: (page) => {
        dispatch(setCurrentPageAC(page));
    },
    setTotalUsersCount: (count) => {
        dispatch(setTotalUsersCountAC(count));
    },
    toggleIsFetching: (IsFetching) => {
        dispatch(toggleIsFetchingAC(IsFetching));
    },
});*/

export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        getUsers,
    }),
    withAuthRedirect
)(UsersContainer);

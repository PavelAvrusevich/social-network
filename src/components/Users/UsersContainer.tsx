import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { AppStateType } from '../../redux/redux-store';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersReselect,
    getFilter,
} from '../../redux/selectors';
import { follow, unfollow, getUsers, FilterType } from '../../redux/users-reducer';
import { UserType } from '../../types/types';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

//take working with server out the presentation component
// side effects (working with server) take out in lifecicle method

type MapStateProps = {
    pageSize: number;
    currentPage: number;
    users: Array<UserType>;
    totalUsersCount: number;
    isFetching: boolean;
    followingInProgress: Array<number>;
    filter: FilterType;
};

type MapDispatchProps = {
    getUsers: (pageSize: number, pageNumber: number, filter: FilterType) => void;
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
};

type Props = MapStateProps & MapDispatchProps;

class UsersContainer extends React.Component<Props> {
    componentDidMount() {
        const { pageSize, currentPage, filter } = this.props;
        this.props.getUsers(pageSize, currentPage, filter);
    }

    //set current page from parametrs, not from props. This state property may not to update yet.

    onChangePage = (p: number) => {
        const { pageSize, filter } = this.props;
        this.props.getUsers(pageSize, p, filter);
    };

    onChangeFilter = (filter: FilterType) => {
        const { pageSize } = this.props;
        this.props.getUsers(pageSize, 1, filter);
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
                    onChangeFilter={this.onChangeFilter}
                />
            </>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateProps => ({
    users: getUsersReselect(state),
    totalUsersCount: getTotalUsersCount(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getFilter(state),
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

export default compose<React.ComponentType>(
    //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
    connect<MapStateProps, MapDispatchProps, {}, AppStateType>(mapStateToProps, {
        follow,
        unfollow,
        getUsers,
    }),
    withAuthRedirect
)(UsersContainer);

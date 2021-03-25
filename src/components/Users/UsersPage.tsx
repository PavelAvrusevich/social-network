import React from 'react';
import { useSelector } from 'react-redux';
import { getIsFetching } from '../../redux/users-selectors';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

//take working with server out the presentation component
// side effects (working with server) take out in lifecicle method
type PropsType = {};

export const UsersPage: React.FC<PropsType> = () => {
    const isFetching = useSelector(getIsFetching);
    return (
        <div>
            {isFetching ? <Preloader /> : null}
            <Users />
        </div>
    );
};

//set current page from parametrs, not from props. This state property may not to update yet.

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

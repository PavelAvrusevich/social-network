import { addPost } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    posts: state.profilePage.posts,
    newText: state.profilePage.newText,
});

const mapDispatchToProps = (dispatch) => ({
    addPost: (newPostBody) => {
        dispatch(addPost(newPostBody));
    },
});

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

import {
    updateNewPostTextActionCreator,
    addPostActionCreator,
} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

function MyPostsContainer(props) {
    let state = props.store.getState();

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    };

    let changeText = (text) => {
        props.store.dispatch(updateNewPostTextActionCreator(text));
    };

    return (
        <MyPosts
            changeText={changeText}
            addPost={addPost}
            posts={state.profilePage.posts}
            newText={state.profilePage.newText}
        />
    );
}

export default MyPostsContainer;

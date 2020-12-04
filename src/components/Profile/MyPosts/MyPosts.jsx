import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import {
    updateNewPostTextActionCreator,
    addPostActionCreator,
} from '../../../redux/profile-reducer';

function MyPosts(props) {
    let postsElements = props.profilePage.posts.map((p) => (
        <Post message={p.message} likesCount={p.likesCount} />
    ));

    let newPost = React.createRef();

    let addPost = () => {
        props.dispatch(addPostActionCreator());
    };

    let changeText = () => {
        let text = newPost.current.value;
        props.dispatch(updateNewPostTextActionCreator(text));
    };

    return (
        <div className={s.postsBlock}>
            <h2>MyPosts</h2>
            <div>
                <textarea
                    onChange={changeText}
                    value={props.profilePage.newText}
                    ref={newPost}
                />
            </div>
            <div>
                <button onClick={addPost}>Add post</button>
            </div>
            <div>
                my post
                <div>new post</div>
                <div className={s.posts}>{postsElements}</div>
            </div>
        </div>
    );
}

export default MyPosts;

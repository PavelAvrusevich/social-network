import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import AddPostForm from './AddPostForm';

const MyPosts = (props) => {
    let postsElements = props.posts.map((p) => <Post message={p.message} likesCount={p.likesCount} />);

    return (
        <div className={s.postsBlock}>
            <h2>MyPosts</h2>
            <AddPostForm addPost={props.addPost} />
            <div>
                <div className={s.posts}>{postsElements}</div>
            </div>
        </div>
    );
};

export default MyPosts;

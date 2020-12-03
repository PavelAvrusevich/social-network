import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';

function MyPosts(props) {
    let postsElements = props.posts.map((p) => (
        <Post message={p.message} likesCount={p.likesCount} />
    ));

    let newPost = React.createRef();
    let addPost = () => {
        props.addPost(newPost.current.value);
    };
    return (
        <div className={s.postsBlock}>
            <h2>MyPosts</h2>
            <div>
                <textarea ref={newPost}></textarea>
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

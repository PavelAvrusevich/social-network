import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';

function MyPosts(props) {
    let postsElements = props.posts.map((p) => (
        <Post message={p.message} likesCount={p.likesCount} />
    ));

    let newPost = React.createRef();

    let onAddPost = () => {
        props.addPost();
    };

    let onChangeText = () => {
        let text = newPost.current.value;
        props.changeText(text);
    };

    return (
        <div className={s.postsBlock}>
            <h2>MyPosts</h2>
            <div>
                <textarea
                    onChange={onChangeText}
                    value={props.newText}
                    ref={newPost}
                />
            </div>
            <div>
                <button onClick={onAddPost}>Add post</button>
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

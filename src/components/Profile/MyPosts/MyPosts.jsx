import s from './MyPosts.module.css';
import Post from './Post/Post';

function MyPosts(props) {
    let postsElements = props.posts.map((p) => (
        <Post message={p.message} likesCount={p.likesCount} />
    ));

    return (
        <div className={s.postsBlock}>
            <h2>MyPosts</h2>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>Add post</button>
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

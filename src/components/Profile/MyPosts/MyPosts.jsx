import s from './MyPosts.module.css';
import Post from './Post/Post';

function MyPosts() {
    let postsData = [
        { id: '1', message: 'привет, как дела??', likesCount: '12' },
        { id: '2', message: 'Я ждун))', likesCount: '10' },
    ];

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
                <div className={s.posts}>
                    <Post
                        message={postsData[0].message}
                        likesCount={postsData[0].likesCount}
                    />
                    <Post
                        message={postsData[1].message}
                        likesCount={postsData[1].likesCount}
                    />
                </div>
            </div>
        </div>
    );
}

export default MyPosts;

import s from './MyPosts.module.css';
import Post from './Post/Post';

function MyPosts() {
    let postsData = [
        { id: '1', message: 'привет, как дела??', likesCount: '12' },
        { id: '2', message: 'Я ждун))', likesCount: '10' },
    ];

    let posts = postsData.map( (p) =><Post message={p.message} likesCount={p.likesCount}/>)

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
                    {posts}
                </div>
            </div>
        </div>
    );
}

export default MyPosts;

import s from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts() {
  return (
    <div>
      MyPosts
      <textarea></textarea>
      <button>Add post</button>
      <div>
        my post
        <div>new post</div>
        <div className={s.posts}>
          <Post message='привет, как дела??' />
          <Post message='Я ждун))'/>
                  </div>
      </div>
    </div>
  );
}

export default MyPosts;

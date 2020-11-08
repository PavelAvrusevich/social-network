import s from "./Post.module.css";

function Post(props) {
  return (
    <div className={s.item}>
      <img src="https://cs9.pikabu.ru/post_img/big/2018/10/22/10/1540228059127699409.jpg"></img>
      {props.message}
      <div>
        <span>like</span>
        <span>like count</span>
      </div>
    </div>
  );
}

export default Post;

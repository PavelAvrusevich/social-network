import React from 'react';
import s from './Post.module.css';

type PostPropsType = {
    message: string;
    likesCount: number;
};

const Post: React.FC<PostPropsType> = (props) => {
    return (
        <div className={s.item}>
            <img src="https://cs9.pikabu.ru/post_img/big/2018/10/22/10/1540228059127699409.jpg"></img>
            {props.message}
            <div>
                <span>like</span>
                <span>{props.likesCount}</span>
            </div>
        </div>
    );
};

export default Post;

import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Profile(props) {
    return (
        <div>
            <ProfileInfo />
            <MyPosts
                profilePage={props.profilePage}
                addPost={props.addPost}
                fixNewText={props.fixNewText}
            />
        </div>
    );
}

export default Profile;

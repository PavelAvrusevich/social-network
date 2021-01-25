import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Profile(props) {
    return (
        <div>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                addAvatar={props.addAvatar}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;

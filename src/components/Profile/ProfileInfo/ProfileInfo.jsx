import { userAPI } from '../../../api/api';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './Status/ProfileStatus';
import userPhoto from '../../../assets/images/user.png';

function ProfileInfo({ profile, status, updateStatus, isOwner, addAvatar }) {
    if (!profile) {
        return <Preloader />;
    }

    return (
        <div className={s.content}>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
                {isOwner && <input type="file" onChange={(e) => addAvatar(e.target.files[0])} />}
                ava+description {profile.fullName}
            </div>
            <ProfileStatus status={status} updateStatus={updateStatus} />
        </div>
    );
}

export default ProfileInfo;

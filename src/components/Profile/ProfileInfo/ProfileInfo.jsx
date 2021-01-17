import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './Status/ProfileStatus';

function ProfileInfo({ profile, status, updateStatus }) {
    if (!profile) {
        return <Preloader />;
    }

    return (
        <div className={s.content}>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large} />
                ava+description {profile.fullName}
            </div>
            <ProfileStatus status={status} updateStatus={updateStatus} />
        </div>
    );
}

export default ProfileInfo;

import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './Status/ProfileStatus';

function ProfileInfo(props) {
    if (!props.profile) {
        return <Preloader />;
    }

    return (
        <div className={s.content}>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} />
                ava+description {props.profile.fullName}
            </div>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
        </div>
    );
}

export default ProfileInfo;

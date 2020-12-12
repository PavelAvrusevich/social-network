import { NavLink } from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';

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
        </div>
    );
}

export default ProfileInfo;

import { NavLink } from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';

function ProfileInfo(props) {
    if (!props.profile) {
        return <Preloader />;
    }

    return (
        <div className={s.content}>
            <div>
                <img src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg" />
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.protos.large} />
                ava+description
            </div>
        </div>
    );
}

export default ProfileInfo;

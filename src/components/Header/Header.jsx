import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.authBlock}>
                {props.isAuth ? props.login : <NavLink to="/login">LOGIN</NavLink>}
            </div>
        </header>
    );
};

export default Header;

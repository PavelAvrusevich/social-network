import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.authBlock}>
                {props.isAuth ? (
                    <div>
                        {props.login} <button onClick={props.logout}> LOGOUT </button>
                    </div>
                ) : (
                    <NavLink to="/login">LOGIN</NavLink>
                )}
            </div>
        </header>
    );
};

export default Header;

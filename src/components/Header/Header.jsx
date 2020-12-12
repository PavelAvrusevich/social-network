import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src="https://image.shutterstock.com/image-vector/dots-letter-c-logo-design-260nw-551769190.jpg"></img>

            <div className={s.authBlock}>
                {props.isAuth ? props.login : <NavLink to="/login">LOGIN</NavLink>}
            </div>
        </header>
    );
};

export default Header;

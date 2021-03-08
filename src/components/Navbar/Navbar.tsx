import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';

const Navbar: React.FC = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.activeLink}>
                    Profile
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs" activeClassName={s.activeLink}>
                    Messages
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users" activeClassName={s.activeLink}>
                    Users
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/News" activeClassName={s.activeLink}>
                    News
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/Music" activeClassName={s.activeLink}>
                    Music
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/Settings" activeClassName={s.activeLink}>
                    Settings
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;

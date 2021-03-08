import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

export type MapPropsType = {
    isAuth: boolean;
    login: string | null;
};

export type DispatchPropsType = {
    logout: () => void;
};

const Header: React.FC<DispatchPropsType & MapPropsType> = (props) => {
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

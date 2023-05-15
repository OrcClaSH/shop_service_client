import React from 'react';
import cn from 'classnames';

import UserMenu from './components/UserMenu';
import { checkAuth } from 'redux/slices/user/userSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { ReactComponent as LogoUserOut } from '../../assets/img/user-logo.svg';
import { ReactComponent as LogoUserIn } from '../../assets/img/user-follow-logo.svg';
import { useOutsideClick } from 'hooks/useOutsideClick';

import styles from './User.module.scss';

const User: React.FC = () => {
    const { ref, isShow, setIsShow } = useOutsideClick(false)
    const isAuth = useAppSelector(state => state.user.isAuth);
    const dispatch = useAppDispatch();
    const ActiveLogo = isAuth ? LogoUserIn : LogoUserOut;
    const userLogoCN = cn(
        styles.wrapper,
        isShow ? styles.active : ''
    )

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, []);

    return (
        <div
            className={userLogoCN}
            onClick={(e) => setIsShow(true)}
            ref={ref}
        >
            <ActiveLogo className={styles['logo-img']} />
            <UserMenu isAuthUser={isAuth} />
        </div>
    )
};

export default User;

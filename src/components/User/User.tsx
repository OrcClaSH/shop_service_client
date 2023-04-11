import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/store';
import cn from 'classnames';

import { ReactComponent as LogoUserOut } from '../../assets/img/user-logo.svg';
import { ReactComponent as LogoUserIn } from '../../assets/img/user-follow-logo.svg';
import UserMenu from './components/UserMenu';

import styles from './User.module.scss';
import { checkAuth } from 'redux/slices/user/userSlice';

const User: React.FC = () => {
    const [activeMenu, setActiveMenu] = React.useState(false);
    const isAuth = useAppSelector(state => state.user.isAuth);
    const dispatch = useAppDispatch();
    const ActiveLogo = isAuth ? LogoUserIn : LogoUserOut;
    const userLogoRef = React.useRef<HTMLDivElement>(null);
    const userLogoCN = cn(
        styles.wrapper,
        activeMenu ? styles.active : ''
    )

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth({ email: '', password: '' })); //TODO
        }
    }, []);

    React.useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (userLogoRef.current
                && !userLogoRef.current.contains(e.target as Node)
                && !target.className.includes('-form__link')
            ) {
                setActiveMenu(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);
        return () => document.removeEventListener('click', handleDocumentClick);

    }, [userLogoRef]);

    return (
        <div
            className={userLogoCN}
            onClick={(e) => setActiveMenu(true)}
            ref={userLogoRef}
        >
            <ActiveLogo className={styles['logo-img']} />
            <UserMenu isAuthUser={isAuth} />
        </div>
    )
};

export default User;

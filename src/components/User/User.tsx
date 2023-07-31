import React from 'react';

import cn from 'classnames';

import { ReactComponent as LogoUserIn } from '../../assets/img/user-follow-logo.svg';
import { ReactComponent as LogoUserOut } from '../../assets/img/user-logo.svg';

import UserMenu from './components/UserMenu';
import styles from './User.module.scss';

import { useOutsideClick } from 'hooks/useOutsideClick';
import { checkAuth } from 'redux/slices/user/userSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

const User: React.FC = () => {
  const { ref, isShow, setIsShow } = useOutsideClick(false);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const dispatch = useAppDispatch();
  const ActiveLogo = isAuth ? LogoUserIn : LogoUserOut;
  const userLogoCN = cn(styles.wrapper, isShow ? styles.active : '');

  const handleClick = (): void => {
    setIsShow(true);
  };

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <div
      className={userLogoCN}
      onClick={handleClick}
      ref={ref}
      role="button"
      tabIndex={0}
      onKeyPress={(event) => (event.key === 'Enter' ? handleClick : undefined)}
    >
      <ActiveLogo className={styles['logo-img']} />
      <UserMenu isAuthUser={isAuth} />
    </div>
  );
};

export default User;

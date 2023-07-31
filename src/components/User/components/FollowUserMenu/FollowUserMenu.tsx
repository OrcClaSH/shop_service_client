/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { Link } from 'react-router-dom';

import st from './FollowUserMenu.module.scss';

import { logout } from 'redux/slices/user/userSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

const FollowUserMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.user.user.email);

  return (
    <div className={st.follow}>
      <h4 className={st.follow__name}>{email}</h4>

      <Link className={st.follow__link} to="#">
        <p>⚙️ Настройки профиля</p>
      </Link>
      <Link className={st.follow__link} to="#">
        <p>📕 Обращения в ЦТО</p>
      </Link>
      <Link className={st.follow__link} to="#">
        <p>📒 Избранное</p>
      </Link>
      <Link className={st.follow__link} to="#">
        <p>📙 Заказы</p>
      </Link>
      <Link className={st.follow__link} to="#" onClick={() => dispatch(logout())}>
        <p>🚪 Выйти</p>
      </Link>
    </div>
  );
};

export default FollowUserMenu;

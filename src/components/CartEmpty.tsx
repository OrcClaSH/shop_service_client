import React from 'react';

import { Link } from 'react-router-dom';

import emptyCartLogo from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая 😕</h2>
      <p>Для того, чтобы выбрать продукт, перейдите на главную страницу.</p>
      <img src={emptyCartLogo} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;

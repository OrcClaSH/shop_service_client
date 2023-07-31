/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
//  TODO

import React, { FC } from 'react';

import cn from 'classnames';
import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';

interface IModal {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const Modal: FC<IModal> = ({ active, setActive, children }) => {
  const modalClasses = cn(styles.modal, active ? styles.active : '');

  const contentClasses = cn(styles.modal__content, active ? styles.active : '');

  const handleModalNotActive = (): void => {
    setActive(false);
  };

  return ReactDOM.createPortal(
    <div className={modalClasses} onClick={handleModalNotActive}>
      <div className={contentClasses} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;

import cn from 'classnames';
import ReactDOM from 'react-dom';
import React, { FC } from 'react';

import styles from './Modal.module.scss';

interface IModal {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
}

const Modal: FC<IModal> = ({ active, setActive, children }) => {
    const modalClasses = cn(
        styles.modal,
        active ? styles.active : '',
    );

    const contentClasses = cn(
        styles.modal__content,
        active ? styles.active : '',
    );

    const handleModalNotActive = () => {
        setActive(false)
    };

    return ReactDOM.createPortal(
        <div className={modalClasses} onClick={handleModalNotActive}>
            <div className={contentClasses} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;

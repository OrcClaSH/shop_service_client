import React, { FC } from 'react';
import ReactDOM from 'react-dom';

import cn from 'classnames';

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
        // document.body.style.overflow = 'visible'
    };

    // React.useEffect(() => {
    //     active
    //         ? document.body.style.overflow = 'hidden'
    //         : document.body.style.overflow = 'visible'
    // }, [active]);

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

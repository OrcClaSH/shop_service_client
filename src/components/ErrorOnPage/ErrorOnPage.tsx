import React from 'react';

import styles from './ErrorOnPage.module.scss';

type TErrorPageProps = {
    error: string;
}

const ErrorOnPage: React.FC<TErrorPageProps> = ({ error }) => {
    return (
        <div className={styles.error}>
            <h2 className={styles.error__title}>При получении данных произошла ошибка! 😕</h2>
            {error && <b className={styles.error__text}>({error})</b>}
        </div>
    )
}

export default ErrorOnPage;

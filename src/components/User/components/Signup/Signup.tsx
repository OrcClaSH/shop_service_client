import React from 'react';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { useInput } from 'hooks/useValidateForm';
import { registration } from 'redux/slices/user/userSlice';

import styles from './Signup.module.scss';

interface ISignup {
    setActiveSignup: React.Dispatch<React.SetStateAction<boolean>>,
}

const Signup: React.FC<ISignup> = ({ setActiveSignup }) => {
    const userError = useAppSelector(state => state.user.error)
    const email = useInput('', { isEmpty: true, minLength: 4, isEmail: true }, userError);
    const password = useInput('', { isEmpty: true, minLength: 3 }, userError)
    const confirmPassword = useInput('', { isEmpty: true, minLength: 3 }, userError)

    const dispatch = useAppDispatch();

    const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(registration({ email: email.value, password: password.value }))
        setActiveSignup(false)
    }

    return (
        <div className={styles.signup}>
            <div className={styles.signup__content}>
                <h2 className={styles.signup__title}>Регистрация</h2>
                <form className={styles['signup-form']}>
                    <div className={styles['signup-form__input-wrapper']}>
                        <input
                            className={styles['signup-form__input']}
                            name='name'
                            type="text"
                            autoComplete='off'
                            value={email.value}
                            onChange={e => email.onChange(e)}
                            onBlur={e => email.onBlur(e)}
                            required
                            onFocus={(e) => email.onFocus(e)}
                        />
                        <p className={styles['signup-form__input-placeholder']}>Имя пользователя</p>
                        {(email.isDirty && email.emailError) &&
                            <div className={styles.signup__error}>{email.emailError}</div>}
                        {(email.isDirty && email.isNotEmail) &&
                            <div className={styles.signup__error}>Указан некорректный email</div>}
                    </div>
                    <div className={styles['signup-form__input-wrapper']}>
                        <input
                            className={styles['signup-form__input']}
                            name='password'
                            type="password"
                            value={password.value}
                            onChange={e => password.onChange(e)}
                            onBlur={e => password.onBlur(e)}
                            required
                        />
                        <p className={styles['signup-form__input-placeholder']}>Пароль</p>
                        {(password.isDirty && password.passwordError) &&
                            <div className={styles.signup__error}>{password.passwordError}</div>}
                        {(password.isDirty && password.minLengthError && !password.isEmpty) &&
                            <div className={styles.signup__error}>Слишком короткий пароль</div>}
                    </div>
                    <div className={styles['signup-form__input-wrapper']}>
                        <input
                            className={styles['signup-form__input']}
                            name='repassword'
                            type="password"
                            value={confirmPassword.value}
                            onChange={e => confirmPassword.onChange(e)}
                            onBlur={e => confirmPassword.onBlur(e)}
                            required
                        />
                        <p className={styles['signup-form__input-placeholder']}>Повтор пароля</p>
                        {(password.isDirty && password.passwordError) &&
                            <div className={styles.signup__error}>{password.passwordError}</div>}
                        {(password.isDirty && password.minLengthError && !password.isEmpty) &&
                            <div className={styles.signup__error}>Слишком короткий пароль</div>}
                        {(password.value !== confirmPassword.value) && <div className={styles.signup__error}>Пароли не совпадают</div>}
                    </div>
                    <div className={styles['signup-form__links']}>
                        <a
                            className={styles['signup-form__link']}
                            onClick={() => setActiveSignup(false)}
                        // href="#"
                        >
                            Уже есть пользователь
                        </a>
                    </div>
                    <button
                        className={styles['signup-form__button']}
                        onClick={e => handleBtnClick(e)}
                        type='submit'
                        disabled={!email.inputValid || !password.inputValid}
                    >
                        Регистрация
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

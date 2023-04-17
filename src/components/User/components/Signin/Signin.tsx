import React from 'react';

import { useInput } from 'hooks/useValidateForm';
import { login } from 'redux/slices/user/userSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

import styles from './Signin.module.scss';

interface ISignin {
    setActiveSignup: React.Dispatch<React.SetStateAction<boolean>>
}

const Signin: React.FC<ISignin> = ({ setActiveSignup }) => {
    const userError = useAppSelector(state => state.user.error)
    const email = useInput('', { isEmpty: true, minLength: 4, isEmail: true }, userError);
    const password = useInput('', { isEmpty: true, minLength: 3 }, userError)

    const dispatch = useAppDispatch();

    const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(login({ email: email.value, password: password.value }))
    }

    const handleRegistrationClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setActiveSignup(true)
    }

    return (
        <div className={styles.signin}>
            <div className={styles.signin__content}>
                <h2 className={styles.signin__title}>Авторизация</h2>
                <form className={styles['signin-form']}>
                    <div className={styles['signin-form__input-wrapper']}>
                        <input
                            className={styles['signin-form__input']}
                            name='name'
                            type="text"
                            autoComplete='off'
                            value={email.value}
                            onChange={e => email.onChange(e)}
                            onBlur={e => email.onBlur(e)}
                            required
                            onFocus={(e) => email.onFocus(e)}
                        />
                        <p className={styles['signin-form__input-placeholder']}>Имя пользователя</p>
                        {(email.isDirty && email.emailError) &&
                            <div className={styles.signin__error}>{email.emailError}</div>}
                        {(email.isDirty && email.isNotEmail) &&
                            <div className={styles.signin__error}>Указан некорректный email</div>}
                    </div>
                    <div className={styles['signin-form__input-wrapper']}>
                        <input
                            className={styles['signin-form__input']}
                            name='password'
                            type="password"
                            value={password.value}
                            onChange={e => password.onChange(e)}
                            onBlur={e => password.onBlur(e)}
                            required
                        />
                        <p className={styles['signin-form__input-placeholder']}>Пароль</p>
                        {(password.isDirty && password.passwordError) &&
                            <div className={styles.signin__error}>{password.passwordError}</div>}
                        {(password.isDirty && password.minLengthError && !password.isEmpty) &&
                            <div className={styles.signin__error}>Слишком короткий пароль</div>}
                    </div>
                    <div
                        className={styles['signin-form__links']}
                        onClick={(e) => handleRegistrationClick(e)}
                    >
                        <a
                            className={styles['signin-form__link']}
                            href="#"
                        >
                            Регистрация
                        </a>
                    </div>
                    <button
                        className={styles['signin-form__button']}
                        onClick={e => handleBtnClick(e)}
                        type='submit'
                        disabled={!email.inputValid || !password.inputValid}
                    >
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signin;

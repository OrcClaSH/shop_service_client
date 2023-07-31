/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';

interface IValidations {
  isEmpty: boolean;
  minLength: number;
  isEmail?: boolean;
}

export const useInput = (
  initialValue: string,
  validations: IValidations,
  userError: string,
) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations, userError);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const onBlur = (): void => {
    setDirty(true);
  };

  const onFocus = (): void => {
    if (valid.setEmailError) {
      valid.setEmailError('');
    }
  };

  return {
    value,
    onChange,
    onBlur,
    onFocus,
    isDirty,
    ...valid,
  };
};

export const useValidation = (
  value: string,
  validations: IValidations,
  userError: string,
) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [emailError, setEmailError] = useState('Имя не может быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [isNotEmail, setIsNotEmail] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  const re =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  useEffect(() => {
    Object.keys(validations).forEach((validation) => {
      switch (validation) {
        case 'minLength':
          setMinLengthError(value.length < validations[validation]);
          break;
        case 'isEmpty':
          if (value) {
            setIsEmpty(false);
            if (!validations.isEmail) {
              setPasswordError('');
            } else {
              setEmailError('');
            }
          } else {
            setIsEmpty(true);
            if (!validations.isEmail) {
              setPasswordError('Пароль не может быть пустым');
            } else {
              setEmailError('Имя не может быть пустым');
            }
          }
          break;
        case 'isEmail':
          if (re.test(String(value).toLowerCase())) {
            setIsNotEmail(false);
            setEmailError('');
          } else {
            setIsNotEmail(true);
          }
          break;
        default:
          break;
      }
    });
  }, [value]);

  useEffect(() => {
    if (validations.isEmail) {
      if (isEmpty || minLengthError || isNotEmail || emailError) {
        setInputValid(false);
      } else {
        setInputValid(true);
      }
    } else if (isEmpty || minLengthError || passwordError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, isNotEmail, emailError, passwordError]);

  useEffect(() => {
    if (userError === 'Неверный пароль') {
      setPasswordError(userError);
    }
    if (userError.includes('с таким email')) {
      setEmailError(userError);
    }
  }, [userError]);

  if (validations.isEmail) {
    return {
      isEmpty,
      minLengthError,
      emailError,
      isNotEmail,
      inputValid,
      setEmailError,
    };
  }

  return {
    isEmpty,
    minLengthError,
    passwordError,
    inputValid,
  };
};

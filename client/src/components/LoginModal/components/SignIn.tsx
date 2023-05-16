import { AxiosError } from 'axios';
import React, { FormEvent, useState } from 'react';

import { useDispatch } from 'react-redux';

import styles from './SignModal.module.scss';

import { ModalAuth } from '../../../constants/modalAuth';
import { Auth } from '../../../constants/titles';
import { AuthErrorsMessage, Validations } from '../../../constants/validationAuth';
import { useInput } from '../../../hooks/useInput';
import { authSlice } from '../../../store/slices/authSlice';
import { userSlice } from '../../../store/slices/userSlice';
import AuthService from '../../API/AuthService';
import Button from '../../Button/Button';
import InputItem from '../../InputItem/InputItem';

const SignIn: React.FC = () => {
  const [formError, setFormError] = useState<string | AuthErrorsMessage>('');
  const email = useInput('', Validations.email);
  const password = useInput('', Validations.password);
  const dispatch = useDispatch();

  const changeHandler = (event: FormEvent) => {
    event.preventDefault();
    dispatch(authSlice.actions.setHeaderModal(Auth.signUp));
  };

  const signIn = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await AuthService.login(email.value, password.value);
      console.log(res);
      localStorage.setItem('token', res.data.accessToken);

      dispatch(authSlice.actions.setAuth(true));
      dispatch(authSlice.actions.setOpenModal(false));
      dispatch(userSlice.actions.setUser(res.data.user));
    } catch (err) {
      if (err instanceof AxiosError) {
        setFormError(`${err.response?.data.error}`);
      }
    }
  };

  return (
    <form action='#' className={styles.userForm} onSubmit={signIn}>
      <InputItem
        input={email}
        placeholder={'E-mail'}
        errorMessage={`E-mail адрес должен содержать "@" символ. "${email.value}" пропущен символ "@".`}
      />

      <InputItem
        input={password}
        placeholder={'Пароль'}
        errorMessage={'Пароль должен содержать от 6 до 15 символов!'}
        isPassword={true}
      />
      {formError && <div className={styles.userForm__formError}>{formError}</div>}
      <Button text={Auth.signIn} additionalClass={styles.userForm__submit} />
      <p>
        {ModalAuth.register}
        <a className={styles.userForm__change} href='/' onClick={changeHandler}>
          {ModalAuth.registerHandler}
        </a>
      </p>
    </form>
  );
};

export default SignIn;

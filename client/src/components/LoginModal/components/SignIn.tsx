import { AxiosError } from 'axios';
import React, { FormEvent, useState } from 'react';

import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router';

import styles from './SignModal.module.scss';

import { ModalAuth } from '../../../constants/modalAuth';
import { Auth } from '../../../constants/titles';
import { AuthErrorsMessage, AuthFields, Validations } from '../../../constants/validationAuth';
import { useInput } from '../../../hooks/useInput';
import { authSlice } from '../../../store/slices/authSlice';
import { userSlice } from '../../../store/slices/userSlice';
import AuthService from '../../API/AuthService';
import Button from '../../Button/Button';
import InputItem from '../../InputItem/InputItem';
import Loader from '../../Loader/Loader';

const SignIn: React.FC = () => {
  const [formError, setFormError] = useState<string | AuthErrorsMessage>('');
  const [formLoad, setFormLoad] = useState<boolean>(false);
  const email = useInput('', Validations.email);
  const password = useInput('', Validations.password);

  const dispatch = useDispatch();
  const router = useNavigate();

  const changeHandler = (event: FormEvent) => {
    event.preventDefault();
    dispatch(authSlice.actions.setHeaderModal(Auth.signUp));
  };

  const signIn = async (event: FormEvent) => {
    event.preventDefault();
    setFormLoad(true);

    try {
      const res = await AuthService.login(email.value, password.value);
      localStorage.setItem('token', res.data.accessToken);

      dispatch(authSlice.actions.setAuth(true));
      dispatch(authSlice.actions.setOpenModal(false));
      dispatch(userSlice.actions.setUser(res.data.user));

      router('/');
    } catch (err) {
      if (err instanceof AxiosError) {
        setFormError(`${err.response?.data.error}`);
      }
    } finally {
      setFormLoad(false);
    }
  };

  return (
    <form action='#' className={styles.userForm} onSubmit={signIn}>
      <InputItem
        input={email}
        placeholder={AuthFields.email}
        errorMessage={`${AuthErrorsMessage.invalidEmail} "${email.value}".`}
      />
      <InputItem
        input={password}
        placeholder={AuthFields.password}
        errorMessage={AuthErrorsMessage.invalidPassword}
        isPassword={true}
      />
      {formError && <div className={styles.userForm__formError}>{formError}</div>}
      <div className={styles.btn__wrapper}>
        <Button text={Auth.signIn} additionalClass={styles.userForm__submit} />
        {formLoad && <Loader additionalClass={styles.auth__loader} />}
      </div>
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

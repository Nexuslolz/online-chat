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
import InputItem, { IInputItemProps } from '../../InputItem/InputItem';
import Loader from '../../Loader/Loader';

const SignUp: React.FC = () => {
  const name = useInput('', Validations.name);
  const email = useInput('', Validations.email);
  const password = useInput('', Validations.password);
  const confirmPassword = useInput('', Validations.confirmPassword, password.value);

  const [formError, setFormError] = useState<string | AuthErrorsMessage>('');
  const [formLoad, setFormLoad] = useState<boolean>(false);

  const dispatch = useDispatch();
  const router = useNavigate();

  const changeHandler = (event: FormEvent) => {
    event.preventDefault();
    dispatch(authSlice.actions.setHeaderModal(Auth.signIn));
  };

  const formFields: IInputItemProps[] = [
    { input: name, placeholder: AuthFields.name, errorMessage: AuthErrorsMessage.invalidName },
    {
      input: email,
      placeholder: AuthFields.email,
      errorMessage: `${AuthErrorsMessage.invalidEmail}. "${email.value}" `,
    },
    {
      input: password,
      placeholder: AuthFields.password,
      errorMessage: AuthErrorsMessage.invalidPassword,
      isPassword: true,
    },
    {
      input: confirmPassword,
      placeholder: AuthFields.confirm,
      errorMessage: AuthErrorsMessage.invalidConfirm,
      isPassword: true,
    },
  ];

  const signUp = async (event: FormEvent) => {
    event.preventDefault();
    setFormLoad(true);

    try {
      const res = await AuthService.register(name.value, email.value, password.value);

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
    <form action='#' className={styles.userForm} onSubmit={signUp}>
      {formFields.map((field) => (
        <InputItem
          input={field.input}
          placeholder={field.placeholder}
          errorMessage={field.errorMessage}
          isPassword={field.isPassword}
        />
      ))}
      {formError && <div className={styles.userForm__formError}>{formError}</div>}
      <div className={styles.btn__wrapper}>
        <Button text={Auth.signUp} additionalClass={styles.userForm__submit} />
        {formLoad && <Loader additionalClass={styles.auth__loader} />}
      </div>

      <p>
        {ModalAuth.login}
        <a className={styles.userForm__change} href='/' onClick={changeHandler}>
          {ModalAuth.loginHandler}
        </a>
      </p>
    </form>
  );
};

export default SignUp;

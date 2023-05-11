import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import AuthButton from './components/AuthButton/AuthButton';
import Logo from './components/Logo/Logo';
import styles from './Header.module.scss';

import { pages } from '../../constants/pages';
import { Auth } from '../../constants/titles';
import { getHeader, getIsAuth, getIsOpen } from '../../store/selectors/authSelector';
import { authSlice } from '../../store/slices/authSlice';
import { userSlice } from '../../store/slices/userSlice';
import { IUser } from '../../types/types';
import AuthService from '../API/AuthService';
import SignIn from '../LoginModal/components/SignIn';
import SignUp from '../LoginModal/components/SignUp';
import LoginModal from '../LoginModal/LoginModal';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(getIsAuth);
  const isOpenStore = useSelector(getIsOpen);
  const headerAuth = useSelector(getHeader);

  const [isOpen, setIsOpen] = useState<boolean>(isOpenStore);

  const openModal = () => {
    dispatch(authSlice.actions.setOpenModal(true));
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');

      dispatch(authSlice.actions.setAuth(false));
      dispatch(userSlice.actions.setUser({} as IUser));

      navigate('/');
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(`${err.response?.data.error}`);
      }
    }
  };

  useEffect(() => {
    setIsOpen(isOpenStore);
  }, [isOpenStore]);

  return (
    <header className={styles.header}>
      <Logo />
      <nav className={styles.header__nav}>
        {isAuth ? (
          <ul className={styles.navList}>
            {pages.map((page, i) => (
              <Link key={i} className={styles.navList__item} to={page.route}>
                {page.name}
              </Link>
            ))}
          </ul>
        ) : (
          <div></div>
        )}
      </nav>
      <AuthButton onClick={isAuth ? logout : openModal} />
      {isOpen && (
        <LoginModal title={headerAuth}>
          {headerAuth === Auth.signIn && <SignIn />}
          {headerAuth === Auth.signUp && <SignUp />}
        </LoginModal>
      )}
    </header>
  );
};

export default Header;

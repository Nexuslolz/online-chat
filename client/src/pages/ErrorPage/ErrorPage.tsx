import React from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import styles from './ErrorPage.module.scss';

import { ErrorPageMessage } from '../../constants/titles';

import { privateRoutes } from '../../routes/router';
import { getIsAuth } from '../../store/selectors/authSelector';

const ErrorPage: React.FC = () => {
  const location = useLocation();
  const isAuth = useSelector(getIsAuth);
  const routesArr = privateRoutes.map((route) => route.path).slice(1);

  return (
    <div className={styles.error__wrapper}>
      <h1>
        {isAuth
          ? ErrorPageMessage.code404
          : routesArr.includes(location.pathname)
          ? ErrorPageMessage.code401
          : ErrorPageMessage.code404}
      </h1>
      <h2>
        {isAuth
          ? ErrorPageMessage.message404
          : routesArr.includes(location.pathname)
          ? ErrorPageMessage.message401
          : ErrorPageMessage.message404}
      </h2>
    </div>
  );
};

export default ErrorPage;

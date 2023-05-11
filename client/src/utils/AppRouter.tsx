import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router';

import Loader from '../components/Loader/Loader';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import { privateRoutes, publicRoutes } from '../routes/router';
import { getIsAuth, getIsLoading } from '../store/selectors/authSelector';

const AppRouter: React.FC = () => {
  const isAuth = useSelector(getIsAuth);
  const isLoading = useSelector(getIsLoading);

  if (isLoading) {
    return <Loader />;
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route, i) => (
        <Route key={i} path={route.path} element={route.element} />
      ))}
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route, i) => (
        <Route key={i} path={route.path} element={route.element} />
      ))}
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;

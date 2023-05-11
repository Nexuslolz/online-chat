import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import AuthService from './components/API/AuthService';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AppRouter from './utils/AppRouter';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    AuthService.checkAuth(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <main>
        <AppRouter />
      </main>
      <Footer />
    </>
  );
};

export default App;

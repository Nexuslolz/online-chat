import { RootState } from '../store';

export const getIsAuth = (state: RootState) => {
  return state.auth.isAuth;
};

export const getIsOpen = (state: RootState) => {
  return state.auth.isOpen;
};

export const getHeader = (state: RootState) => {
  return state.auth.header;
};

export const getIsLoading = (state: RootState) => {
  return state.auth.isLoading;
};

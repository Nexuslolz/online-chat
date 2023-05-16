import { RootState } from '../store';

export const getId = (state: RootState) => {
  return state.user.id;
};

export const getName = (state: RootState) => {
  return state.user.name;
};

export const getEmail = (state: RootState) => {
  return state.user.email;
};

export const getBody = (state: RootState) => {
  return state.user.body;
};

export const getPosts = (state: RootState) => {
  return state.user.posts;
};

export const getUserError = (state: RootState) => {
  return state.user.isError;
};

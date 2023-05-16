import { RootState } from '../store';

export const getPostFile = (state: RootState) => {
  return state.posts.file;
};

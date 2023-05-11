import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, IUserBody, IUserPost } from '../../types/types';

const initialState: IUser = {
  id: '',
  name: '',
  email: '',
  body: {
    about: '',
    education: '',
    hobby: '',
  },
  posts: [],
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.body = action.payload.body;
      state.posts = action.payload.posts;
    },
    updateUser(state, action: PayloadAction<IUserBody>) {
      state.body = action.payload;
    },
    createPost(state, action: PayloadAction<IUserPost[]>) {
      state.posts = action.payload;
    },
  },
});

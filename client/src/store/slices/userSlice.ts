import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, IUserBody, IUserPost } from '../../types/types';

const initialState: IUser = {
  id: '',
  name: '',
  email: '',
  body: {
    about: '',
    age: '',
    city: '',
  },
  posts: [],
  friends: [],
  isError: false,
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
      state.friends = action.payload.friends;
    },
    updateUser(state, action: PayloadAction<IUserBody>) {
      state.body = action.payload;
    },
    createPost(state, action: PayloadAction<IUserPost[]>) {
      state.posts = action.payload;
    },
    addFriend(state, action: PayloadAction<string[]>) {
      state.friends = action.payload;
    },
    setUserError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
  },
});

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Auth } from '../../constants/titles';

interface IIsAuth {
  isAuth: boolean;
  isOpen: boolean;
  header: string;
  isLoading: boolean;
}

const initialState: IIsAuth = {
  isAuth: false,
  isOpen: false,
  header: Auth.signIn,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setOpenModal(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setHeaderModal(state, action: PayloadAction<string>) {
      state.header = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

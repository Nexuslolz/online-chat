import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPostFile {
  file: File;
}

const initialState: IPostFile = {
  file: {} as File,
};

export const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    setPostFile(state, action: PayloadAction<File>) {
      state.file = action.payload;
    },
  },
});

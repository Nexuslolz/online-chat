import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';

import UserService from '../components/API/UserService';
import { userSlice } from '../store/slices/userSlice';

export const addFriend = (
  userId: string,
  id: string,
  friendList: string[],
  dispatch: Dispatch<AnyAction>,
  setIsFriend: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  UserService.addFriend(userId, id);
  dispatch(userSlice.actions.addFriend([...friendList, id]));
  setIsFriend(true);
};

export const deleteFriend = (
  userId: string,
  id: string,
  friendList: string[],
  dispatch: Dispatch<AnyAction>,
  setIsFriend: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  UserService.deleteFriend(userId, id);
  const deleteFriend = friendList.filter((item) => item !== id);
  dispatch(userSlice.actions.addFriend(deleteFriend));
  setIsFriend(false);
};

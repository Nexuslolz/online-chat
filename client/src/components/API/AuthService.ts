import { AnyAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { Dispatch } from 'react';

import { $api } from './ApiInstance';

import { API } from '../../constants/api';
import { authSlice } from '../../store/slices/authSlice';
import { userSlice } from '../../store/slices/userSlice';
import { IAuthResponse } from '../../types/types';

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/auth/login', { email, password });
  }

  static async register(name: string, email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/auth/register', { name, email, password });
  }

  static async logout(): Promise<void> {
    return $api.post('/auth/logout');
  }

  static async checkAuth(dispatch: Dispatch<AnyAction>) {
    dispatch(authSlice.actions.setIsLoading(true));
    try {
      const res = await axios.get<IAuthResponse>(`${API.base}/auth/refresh`, { withCredentials: true });
      localStorage.setItem('token', res.data.accessToken);

      dispatch(authSlice.actions.setAuth(true));
      dispatch(authSlice.actions.setOpenModal(false));
      dispatch(userSlice.actions.setUser(res.data.user));
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(`${err.response?.data.error}`);
      }
    } finally {
      dispatch(authSlice.actions.setIsLoading(false));
    }
  }
}

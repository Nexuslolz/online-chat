import axios from 'axios';

import { API } from '../../constants/api';

export const $api = axios.create({
  withCredentials: true,
  baseURL: API.base,
});

export const $file = axios.create({
  withCredentials: true,
  baseURL: API.base,
  headers: { 'Content-Type': 'multipart/form-data' },
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$file.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

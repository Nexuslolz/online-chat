import axios from 'axios';

import { API } from '../../constants/api';

const $api = axios.create({
  withCredentials: true,
  baseURL: API.base,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default $api;

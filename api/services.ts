import axios from 'axios';
import config from 'config';
import * as SecureStore from 'expo-secure-store';

export const noAuthClient = axios.create({
  baseURL: config.apiUrl,
  timeout: 20000,
});

export const authClient = axios.create({
  baseURL: config.apiUrl,
  timeout: 20000,
});

authClient.interceptors.request.use(async (req) => {
  const accessToken = await SecureStore.getItemAsync('token');

  if (req && req.headers) {
    req.headers.authorization = `Bearer ${accessToken}`;
  }

  return req;
});


import { io } from 'socket.io-client';
import config from 'config';
import * as SecureStore from 'expo-secure-store';

export const useWebSocket = () => {
  const socket = io(config.webSocketApiUrl || '', {
    auth: async (cb) => {
      cb({ token: await SecureStore.getItemAsync('token') });
    },
  });

  return { socket };
};

import { io } from 'socket.io-client';
import * as SecureStore from 'expo-secure-store';
import config from 'config';

export default {
  socket: io(config.webSocketApiUrl || '', {
    auth: async (cb) => {
      cb({ token: await SecureStore.getItemAsync('token') });
    },
  }),
};

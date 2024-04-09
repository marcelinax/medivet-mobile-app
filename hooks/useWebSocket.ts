import webSocket from 'hooks/webSocket';

export const useWebSocket = () => {
  const { socket } = webSocket;

  return { socket };
};

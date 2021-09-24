import { useContext } from 'react';
import SocketContext from '../contexts/socket';

export const useSocket = () => {
  const { connect, disconnect, socket } = useContext(SocketContext);

  return {
    disconnectSocket: disconnect,
    connectSocket: connect,
    socket,
  };
};

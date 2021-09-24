import React, { createContext, useState, useCallback } from 'react';

import { io, Socket } from 'socket.io-client';
import { SocketErrors } from '../errors/SocketErrors';

export interface SocketContextData {
  connect(accessToken: string): Promise<void>;
  disconnect(): void;
  socket: Socket | undefined;
}

const SocketContext = createContext<SocketContextData>({} as SocketContextData);

export const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();

  const connect = useCallback(async (accessToken: string) => {
    const socketConnection = await new Promise<Socket>((resolve, reject) => {
      if (process.env.REACT_APP_API_URL) {
        const connection = io(process.env.REACT_APP_API_URL, {
          auth: {
            token: `Bearer ${accessToken}`,
          },
        });

        connection.on('connect', () => {
          resolve(connection);
        });

        connection.on('connect_error', error => {
          reject(new SocketErrors.ConnectionUnathorized());
          console.log(error);
        });
      } else {
        reject(new Error('Environment variables API URL is not set'));
      }
    });

    setSocket(socketConnection);
  }, []);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
    }
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        connect,
        socket,
        disconnect,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;

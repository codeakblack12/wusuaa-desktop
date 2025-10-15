import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { WUSUAA_API } from '../server';

export const SocketContext = createContext(null);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('USER_TOKEN') || null);

  // 👀 Watch for localStorage changes (in case of login/logout in same or other tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('USER_TOKEN');
      if (updatedToken !== token) {
        console.log('🔁 Token changed, refreshing socket...');
        setToken(updatedToken);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [token]);

  // 🔌 Reconnect socket when token changes
  useEffect(() => {
    if (!token) {
      console.log('⛔ No token, not connecting socket');
      if (socket) socket.disconnect();
      return;
    }

    console.log('⚡ Connecting socket with new token...');
    const newSocket = io(WUSUAA_API, {
      auth: { authorization: `Bearer ${token}` },
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('✅ Socket connected');
      newSocket.emit('authenticate', { token });
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    setSocket(newSocket);

    // Cleanup old socket when token changes or component unmounts
    return () => {
      console.log('🧹 Cleaning up socket...');
      newSocket.disconnect();
    };
  }, [token]);

  // ✅ Expose a manual refresh function
  const refreshSocket = () => {
    console.log('🔄 Manually refreshing socket...');
    const newToken = localStorage.getItem('USER_TOKEN');
    setToken(newToken);
  };

  return (
    <SocketContext.Provider value={{ socket, refreshSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

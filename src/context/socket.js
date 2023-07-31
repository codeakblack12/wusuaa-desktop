import { createContext } from 'react';
import { io } from 'socket.io-client';
import { WUSUAA_API } from '../server';

const AUTH_TOKEN = localStorage.getItem('USER_TOKEN') || null;

const socket = io(WUSUAA_API, {
    // cors: {
    //     origin: ["*"],
    //     handlePreflightRequest: (req, res) => {
    //         res.wriiteHead(200, {
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Methods": "GET,POST",
    //             "Access-Control-Allow-Headers": "my-custom-header",
    //             "Access-Control-Allow-Credentials": true,
    //         });
    //         res.end()
    //     }
    // },
    auth: { authorization: `Bearer ${AUTH_TOKEN}` }
});

socket.on('connect', () => {
    socket.emit('authenticate', { token: AUTH_TOKEN }).on('authenticated', () => {});
});

socket.on('disconnect', () => {});

const SocketContext = createContext(null);

const SocketContextProvider = ({ children }) => {
    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketContextProvider };
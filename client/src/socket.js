import { io } from "socket.io-client";

let socket = undefined;
const connectSocket = (user_id) => {
    return socket = io('http://localhost:3000', {
        query: `user_id=${user_id}`
    })
};

export {socket, connectSocket};
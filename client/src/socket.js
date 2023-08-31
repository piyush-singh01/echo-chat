import { io } from "socket.io-client";

let socket = undefined;
const connectSocket = (user_id) => {
    // should have url of server.
    return socket = io('http://localhost:5000', {
        query: `user_id=${user_id}`
    })
};

export {socket, connectSocket};
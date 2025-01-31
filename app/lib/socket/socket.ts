import { io } from "socket.io-client";

const endpoint = process.env.ENDPOINT ? process.env.ENDPOINT:  "https://codev-api.onrender.com";
const socket = io(endpoint);

export default socket;
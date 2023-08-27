import { io } from "socket.io-client"

const socket = new io("http://localhost:3001", {
  autoconnect: false,
  withCredentials: true,
  transports: ['websocket']
})

export default socket;
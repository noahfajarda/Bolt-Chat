const express = require('express');

// web socket request
const { Server } = require('socket.io');
const helmet = require("helmet")

const app = express();
const PORT = 3001;
const cors = require("cors")
require("dotenv").config()

// routes
const authRouter = require("./routers/authRouter");

// session middleware
const { sessionMiddleware, wrap, corsConfig } = require('./controllers/serverController');
const { authorizeUser, initializeUser, addFriend } = require('./controllers/socketController');

const server = require('http').createServer(app);

const io = new Server(server, {
  cors: corsConfig
})

// add body parser to read body from React
app.use(require("body-parser").json())
app.use(helmet());

// specify middleware to communicate with server
app.use(cors(corsConfig))
app.use(express.json())

// initialize express session & configuration
app.use(sessionMiddleware)

// middleware access to routes
app.use("/auth", authRouter)

// use 'wrap' function (closure) with session middleware
io.use(wrap(sessionMiddleware))
// socket middleware to check for user session
io.use(authorizeUser)

io.on("connect", socket => {
  initializeUser(socket)
  socket.on("add_friend", (friendName, cb) => addFriend(socket, friendName, cb))
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Server running on http://localhost:${PORT}`);
})
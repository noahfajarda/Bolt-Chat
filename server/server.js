const express = require('express');

// web socket request
const { Server } = require('socket.io');
const helmet = require("helmet")

const app = express();
const PORT = 3001;
const cors = require("cors")
require("dotenv").config()

// express session
const session = require("express-session");

// routes
const authRouter = require("./routers/authRouter")

const server = require('http').createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: "true"
  }
})

// add body parser to read body from React
app.use(require("body-parser").json())
app.use(helmet());

// specify middleware to communicate with server
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())

// initialize express session & configuration
app.use(session({
  secret: process.env.COOKIE_SECRET,
  credentials: true,
  name: "sid",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
    httpOnly: true,
    sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    expires: 1000 * 60 * 60 * 24 * 7
  }
}))

// middleware access to routes
app.use("/auth", authRouter)

io.on("connect", socket => { });

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Server running on http://localhost:${PORT}`);
})
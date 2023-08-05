const express = require('express');

// web socket request
const { Server } = require('socket.io');
const helmet = require("helmet")

const app = express();
const PORT = 3001;
const cors = require("cors")
const authRouter = require("./routers/authRouter")

const server = require('http').createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true"
  }
})

app.use(helmet());
// specify middleware to communicate with server
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(express.json())

// middleware access to routes
app.use("/auth", authRouter)

io.on("connect", socket => { });

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Server running on http://localhost:${PORT}`);
})
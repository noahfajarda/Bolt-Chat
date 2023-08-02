const express = require('express');

// web socket request
const { Server } = require('socket.io');
const helmet = require("helmet")

const app = express();
const PORT = 3001;

const server = require('http').createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true"
  }
})

app.use(helmet());
app.use(express.json())

app.get("/", (req, res) => {
  res.send("testing")
})

io.on("connect", socket => { });

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Server running on http://localhost:${PORT}`);
})
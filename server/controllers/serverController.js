// express session
const session = require("express-session");
// env
require("dotenv").config()
// redis
const RedisStore = require('connect-redis')(session)
const redisClient = require('../redis')

const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET,
  credentials: true,
  name: "sid",
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
  cookie: {
    secure: process.env.NODE_ENV === "production" ? "true" : "auto",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: 1000 * 60 * 60 * 24 * 7
  }
})

// saved in a closure
const wrap = expressMiddlware => (socket, next) => expressMiddlware(socket.request, {}, next)

const corsConfig = {
  origin: "http://localhost:5173",
  credentials: "true"
}

module.exports = { sessionMiddleware, wrap, corsConfig }
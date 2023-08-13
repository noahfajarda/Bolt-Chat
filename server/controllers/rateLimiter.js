const redisClient = require("../redis")

// limit requests in a short amount of time
module.exports.rateLimiter = (secondsLimit, limitAmount) => {
  return async (req, res, next) => {
    const ip = req.connection.remoteAddress.slice(0, 2)
    const [response] = await redisClient.multi().incr(ip).expire(ip, secondsLimit).exec()

    // amount of requests in a short period of time
    console.log(response[1])
    if (response[1] > limitAmount) {
      res.json({ loggedIn: false, status: "Too many requests within a short period of time!" })
    } else {
      next()
    }
  }
}
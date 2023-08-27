const redisClient = require("../redis")

module.exports.authorizeUser = (socket, next) => {
  // check if socket has a 'SESSION' and a 'user' object
  // session doesn't exist yet, so get back to this
  if (!socket.request.session || !socket.request.session.user) {
    console.log("Bad Request")
    // uncomment this once fixed
    // next(new Error("Not authorized"))
    next()
  } else {
    socket.user = { ...socket.request.session.user }
    redisClient.hset(`userid:${socket.user.username}`, "userid", socket.user.userid)
    next()
  }
}

module.exports.initializeUser = async (socket) => {
  // retrieve socket for user
  console.log(socket.request.session)
  socket.user = { ...socket.request.session.user };

  // set the socket in redis for the current user
  await redisClient.hset(
    `userid:${socket.user.username}`,
    "userid",
    socket.user.userid
  )

  // retrieve & set the friends of the current user with redis
  const friendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1)
  socket.emit("friends", friendList)
}

module.exports.addFriend = async (socket, friendName, cb) => {
  // check if attempted friend == logged in user
  if (friendName === socket.user.username) {
    cb({ done: false, errorMsg: "Cannot add self!" })
    return
  }

  // check if user exists
  const friendUserId = await redisClient.hget(`userid:${friendName}`, "userid")
  // check if user is already in friend's list
  const currentFriendsList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1)

  // if no user exists, show error and don't add as friend
  if (!friendUserId) {
    cb({ done: false, errorMsg: "User doesn't exist!" })
    return;
  }

  // if the friend is already in the list, show error and don't add as friend
  if (currentFriendsList && currentFriendsList.indexOf(friendName) !== -1) {
    cb({ done: false, errorMsg: "Friend already added!" })
  }

  // add the friend to redis
  await redisClient.lpush(`friends:${socket.user.username}`, friendName);
  cb({ done: true })
}
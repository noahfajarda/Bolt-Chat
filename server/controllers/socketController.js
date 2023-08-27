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
  socket.join(socket.user.userid)

  // set the socket in redis for the current user
  await redisClient.hset(
    `userid:${socket.user.username}`,
    "userid",
    socket.user.userid,
    "connected",
    true
  )

  // retrieve & set the friends of the current user with redis
  const friendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  )

  const parsedFriendList = await parseFriendList(friendList)

  const friendRooms = parsedFriendList.map(friend => friend.userid)

  if (friendRooms.length > 0) {
    // emit to all friends that we are offline now
    socket.to(friendRooms).emit("connected", true, socket.user.username)
  }

  socket.emit("friends", parsedFriendList)
}

module.exports.addFriend = async (socket, friendName, cb) => {
  // check if attempted friend == logged in user
  if (friendName === socket.user.username) {
    cb({ done: false, errorMsg: "Cannot add self!" })
    return
  }

  // check if user exists
  const friend = await redisClient.hgetall(`userid:${friendName}`)
  // check if user is already in friend's list
  const currentFriendsList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1)

  // if no user exists, show error and don't add as friend
  if (!friend) {
    cb({ done: false, errorMsg: "User doesn't exist!" })
    return;
  }

  // if the friend is already in the list, show error and don't add as friend
  if (currentFriendsList && currentFriendsList.indexOf(friendName) !== -1) {
    cb({ done: false, errorMsg: "Friend already added!" })
  }

  // add the friend to redis
  await redisClient.lpush(
    `friends:${socket.user.username}`,
    [friendName, friend.userid,].join(".")
  );

  const newFriend = {
    username: friendName,
    userid: friend.userid,
    connected: friend.connected,
  }
  cb({ done: true })
}

module.exports.onDisconnect = async (socket) => {
  await redisClient.hset(
    `userid:${socket.user.username}`,
    "connected",
    false
  );

  // get friends
  const friendList = await redisClient.lrange(`friends:${socket.user.username}`,
    0, -1)
  const friendRooms = await parseFriendList(friendList).then(
    friends => friends.map(friend => friend.userid)
  )

  // emit to all friends that we are offline now
  socket.to(friendRooms).emit("connected", false, socket.user.username)
}

const parseFriendList = async (friendList) => {
  const newFriendList = [];
  for (let friend of friendList) {
    const parsedFriend = friend.split('.')

    const friendConnected = await redisClient.hget(
      `userid:${parsedFriend[0]}`,
      "connected"
    )

    newFriendList.push({
      username: parsedFriend[0],
      userid: parsedFriend[1],
      connected: friendConnected
    })
  }
  return newFriendList;
}
module.exports.authorizeUser = (socket, next) => {
  // check if socket has a 'SESSION' and a 'user' object
  // session doesn't exist yet, so get back to this
  if (!socket.request.session || !socket.request.session.user) {
    console.log("Bad Request")
    // uncomment this once fixed
    // next(new Error("Not authorized"))
    next()
  } else {
    next()
  }
}
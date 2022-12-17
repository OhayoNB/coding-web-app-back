const logger = require('./logger.service')

var gIo = null

function setupSocketAPI(http) {
  gIo = require('socket.io')(http, { cors: { origin: '*' } })
  gIo.on('connection', (socket) => {
    logger.info(`New connected socket [id: ${socket.id}]`)
    socket.on('disconnect', (socket) => {
      logger.info(`Socket disconnected [id: ${socket.id}]`)
    })
    socket.on('join-codeblock', (codeblockId) => {
      if (socket.myCodeblockId === codeblockId) return
      if (socket.myCodeblockId) {
        socket.leave(socket.myCodeblockId)
        logger.info(
          `Socket is leaving codeblock ${socket.myCodeblockId} [id: ${socket.id}]`
        )
      }
      socket.join(codeblockId)
      socket.myCodeblockId = codeblockId
      logger.info(
        `Socket is now on codeblock ${socket.myCodeblockId} [id: ${socket.id}]`
      )
    })
    socket.on('set-user-socket', (userId) => {
      logger.info(
        `Setting socket.userId = ${userId} for socket [id: ${socket.id}]`
      )
      socket.userId = userId
    })
  })
}

// If possible, send to all sockets BUT not the current socket
// Optionally, broadcast to a room / to all
async function broadcast({ type, data, room = null, userId }) {
  userId = userId?.toString()
  logger.info(`Broadcasting event: ${type}`)
  const excludedSocket = await _getUserSocket(userId)

  if (room && excludedSocket) {
    logger.info(`Broadcast to room ${room} excluding user: ${userId}`)
    excludedSocket.broadcast.to(room).emit(type, data)
  } else if (excludedSocket) {
    logger.info(`Broadcast to all excluding user: ${userId}`)
    excludedSocket.broadcast.emit(type, data)
  } else if (room) {
    logger.info(`Emit to room: ${room}`)
    gIo.to(room).emit(type, data)
  } else {
    logger.info(`Emit to all`)
    gIo.emit(type, data)
  }
}

async function _getUserSocket(userId) {
  const sockets = await _getAllSockets()
  const socket = sockets.find((s) => s.userId === userId)
  return socket
}
async function _getAllSockets() {
  // return all Socket instances
  const sockets = await gIo.fetchSockets()
  return sockets
}

module.exports = {
  // set up the sockets service and define the API
  setupSocketAPI,
  // Send to all sockets BUT not the current socket - if found
  // (otherwise broadcast to a room / to all)
  broadcast,
}

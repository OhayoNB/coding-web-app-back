const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  getSessionById,
  add,
}

async function getSessionById(sessionId) {
  try {
    const collection = await dbService.getCollection('session')
    const session = collection.findOne({ _id: ObjectId(sessionId) })
    return session
  } catch (err) {
    logger.error(`while finding session ${sessionId}`, err)
    throw err
  }
}

async function add(session) {
  try {
    const collection = await dbService.getCollection('session')
    await collection.insertOne(session)

    return session
  } catch (err) {
    logger.error('cannot insert session', err)
    throw err
  }
}

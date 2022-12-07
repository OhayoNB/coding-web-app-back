const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  query,
  getCodeblockById,
}

async function query() {
  try {
    const collection = await dbService.getCollection('codeblock')
    const codeblocks = await collection.find().toArray()
    return codeblocks
  } catch (err) {
    logger.error('cannot find codeblocks', err)
    throw err
  }
}

async function getCodeblockById(codeblockId) {
  try {
    const collection = await dbService.getCollection('codeblock')
    const codeblock = collection.findOne({ _id: ObjectId(codeblockId) })
    return codeblock
  } catch (err) {
    logger.error(`while finding codeblock ${codeblockId}`, err)
    throw err
  }
}

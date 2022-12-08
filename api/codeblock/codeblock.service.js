const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  query,
  getCodeblockById,
  update,
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

async function update(codeblock) {
  try {
    let codeblockId = codeblock._id
    let id = ObjectId(codeblock._id)
    delete codeblock._id
    const collection = await dbService.getCollection('codeblock')
    await collection.updateOne({ _id: id }, { $set: { ...codeblock } })
    codeblock._id = codeblockId
    return codeblock
  } catch (err) {
    logger.error(`cannot update codeblock ${codeblockId}`, err)
    throw err
  }
}

const codeblockService = require('./codeblock.service.js')
const logger = require('../../services/logger.service')

module.exports = {
  getCodeblocks,
  getCodeblockById,
}

// GET LIST
async function getCodeblocks(req, res) {
  try {
    logger.debug('Getting Codeblocks')
    const codeblocks = await codeblockService.query()
    res.json(codeblocks)
  } catch (err) {
    logger.error('Failed to get codeblocks', err)
    res.status(500).send({ err: 'Failed to get codeblocks' })
  }
}

// GET BY ID
async function getCodeblockById(req, res) {
  try {
    const codeblockId = req.params.id
    const codeblock = await codeblockService.getCodeblockById(codeblockId)
    res.json(codeblock)
  } catch (err) {
    logger.error('Failed to get codeblock', err)
    res.status(500).send({ err: 'Failed to get codeblock' })
  }
}

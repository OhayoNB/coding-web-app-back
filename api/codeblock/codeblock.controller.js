const codeblockService = require('./codeblock.service.js')
const logger = require('../../services/logger.service')
const { broadcast } = require('../../services/socket.service.js')

module.exports = {
  getCodeblocks,
  getCodeblockById,
  updateCodeblock,
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

// PUT
async function updateCodeblock(req, res) {
  try {
    const codeblock = req.body
    const updatedCodeblock = await codeblockService.update(codeblock)
    console.log('updateddddddddddddddddddddd', updatedCodeblock)

    broadcast({
      type: 'update-codeblock',
      data: updatedCodeblock,
      room: updatedCodeblock._id,
      userId: updatedCodeblock.userId,
    })

    res.json(updatedCodeblock)
  } catch (err) {
    logger.error('Failed to update codeblock', err)
    res.status(500).send({ err: 'Failed to update codeblock' })
  }
}

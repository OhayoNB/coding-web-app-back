const sessionService = require('./session.service.js')
const logger = require('../../services/logger.service')

module.exports = {
  getSessionById,
  addSession,
}

// GET BY ID
async function getSessionById(req, res) {
  try {
    const sessionId = req.params.id
    const session = await sessionService.getSessionById(sessionId)
    res.json(session)
  } catch (err) {
    logger.error('Failed to get session', err)
    res.status(500).send({ err: 'Failed to get session' })
  }
}

// POST (add session)
async function addSession(req, res) {
  try {
    const session = req.body
    const addedBoard = await sessionService.add(session)
    res.json(addedBoard)
  } catch (err) {
    logger.error('Failed to add session', err)
    res.status(500).send({ err: 'Failed to add session' })
  }
}

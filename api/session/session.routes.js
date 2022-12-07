const express = require('express')
//prettier-ignore
const { getSessionById, addSession } = require('./session.controller')
const router = express.Router()

router.get('/:id', getSessionById)
router.post('/', addSession)

module.exports = router

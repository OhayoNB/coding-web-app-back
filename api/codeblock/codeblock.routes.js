const express = require('express')
const { getCodeblocks, getCodeblockById } = require('./codeblock.controller')
const router = express.Router()

router.get('/', getCodeblocks)
router.get('/:id', getCodeblockById)

module.exports = router

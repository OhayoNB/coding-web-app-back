const express = require('express')
const {
  getCodeblocks,
  getCodeblockById,
  updateCodeblock,
} = require('./codeblock.controller')
const router = express.Router()

router.get('/', getCodeblocks)
router.get('/:id', getCodeblockById)
router.put('/:id', updateCodeblock)

module.exports = router

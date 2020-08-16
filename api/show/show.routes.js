const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { saveShow, getShows, deleteShow, getShowById } = require('./show.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getShows);
router.get('/:id', getShowById)
router.post('/', saveShow);
router.put('/', saveShow)
router.delete('/:id', requireAuth, deleteShow);

module.exports = router
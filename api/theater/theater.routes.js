const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { saveTheater, getTheaters, deleteTheater, getTheaterById } = require('./theater.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getTheaters);
router.get('/:id', getTheaterById);

module.exports = router
const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { saveMovie, getMovies, deleteMovie, getMovieById } = require('./movie.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getMovies);
router.get('/:id', getMovieById)
router.post('/', saveMovie);
router.put('/', saveMovie)
router.delete('/:id', requireAuth, deleteMovie);

module.exports = router
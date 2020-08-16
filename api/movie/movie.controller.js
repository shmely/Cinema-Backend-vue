const logger = require('../../services/logger.service')
const movieService = require('./movie.service')

// TODO: needs error handling! try, catch

async function getMovies(req, res) {
    try {
        const movies = await movieService.query(req.query)
        res.send(movies)
    } catch (err) {
        logger.error(err);
        logger.error('Cannot get movies: ' + err.message);
        res.status(500).send({ error: 'cannot get movies' })
    }
}

async function getMovieById(req, res) {
    try {
        const { id } = req.params;
        const movie = await movieService.getById(id)
        res.send(movie)
    } catch (err) {

        logger.error('Cannot get movies', err.message);
        res.status(500).send({ error: `cannot get movie with id: ${id}` });
    }
}



async function deleteMovie(req, res) {
    try {
        await movieService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete movie', err.message);
        res.status(500).send({ error: 'cannot delete movie' })
    }
}

async function saveMovie(req, res) {
    var movie = req.body;
    movie = await movieService.save(movie);
    res.send(movie);
}


module.exports = {
    getMovies,
    deleteMovie,
    saveMovie,
    getMovieById
}
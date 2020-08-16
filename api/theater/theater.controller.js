const logger = require('../../services/logger.service');
const theaterService = require('./theater.service');

async function getTheaterById(req, res) {
    try {
        const { id } = req.params;
        const theater = await theaterService.getById(id)
        res.send(theater)
    } catch (err) {

        logger.error('Cannot get theaters', err.message);
        res.status(500).send({ error: `cannot get theater with id: ${id}` });
    }
}
async function getTheaters(req, res) {
    try {
        const theaters = await theaterService.query(req.query)
        res.send(theaters)
    } catch (err) {
        logger.error(err);
        logger.error('Cannot get theaters: ' + err.message);
        res.status(500).send({ error: 'cannot get theaters' })
    }
}

module.exports = {
    getTheaterById,
    getTheaters
}
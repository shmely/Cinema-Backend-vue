const logger = require('../../services/logger.service')
const showService = require('./show.service')

// TODO: needs error handling! try, catch

async function getShows(req, res) {
    try {
        const shows = await showService.query(req.query)
        res.send(shows)
    } catch (err) {
        logger.error(err);
        logger.error('Cannot get shows: ' + err.message);
        res.status(500).send({ error: 'cannot get shows' })
    }
}

async function getShowById(req, res) {
    try {
        const { id } = req.params;
        const show = await showService.getById(id)
        res.send(show)
    } catch (err) {

        logger.error('Cannot get shows', err.message);
        res.status(500).send({ error: `cannot get show with id: ${id}` });
    }
}



async function deleteShow(req, res) {
    try {
        await showService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete show', err.message);
        res.status(500).send({ error: 'cannot delete show' })
    }
}

async function saveShow(req, res) {
    var show = req.body;
    show = await showService.save(show);
    res.send(show);
}


module.exports = {
    getShows,
    deleteShow,
    saveShow,
    getShowById
}
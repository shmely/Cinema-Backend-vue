const logger = require('../../services/logger.service')
const ticketService = require('./ticket.service')

// TODO: needs error handling! try, catch

async function getTickets(req, res) {
    try {
        const tickets = await ticketService.query(req.query)
        res.send(tickets)
    } catch (err) {
        logger.error(err);
        logger.error('Cannot get tickets: ' + err.message);
        res.status(500).send({ error: 'cannot get tickets' })
    }
}

async function getTicketById(req, res) {
    try {
        const { id } = req.params;
        const ticket = await ticketService.getById(id)
        res.send(ticket)
    } catch (err) {

        logger.error('Cannot get tickets', err.message);
        res.status(500).send({ error: `cannot get ticket with id: ${id}` });
    }
}



async function deleteTicket(req, res) {
    try {
        await ticketService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete ticket', err.message);
        res.status(500).send({ error: 'cannot delete ticket' })
    }
}

async function saveTickets(req, res) {
    var tickets = req.body;
    ticket = await ticketService.save(tickets);
    res.send(ticket);
}


module.exports = {
    getTickets,
    deleteTicket,
    saveTickets,
    getTicketById
}
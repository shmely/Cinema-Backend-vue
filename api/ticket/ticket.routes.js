const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { saveTickets, getTickets, deleteTicket, getTicketById } = require('./ticket.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getTickets);
router.get('/:id', getTicketById)
router.post('/', saveTickets);
router.delete('/:id', requireAuth, deleteTicket);
module.exports = router
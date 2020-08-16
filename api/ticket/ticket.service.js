const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    try {

        const collection = await dbService.getCollection('ticket');
        const tickets = collection.find().toArray();
        return tickets;
    } catch (err) {
        console.log('ERROR: cannot find tickets')
        throw err;
    }
}

async function remove(ticketId) {
    const collection = await dbService.getCollection('ticket')
    try {
        await collection.deleteOne({ "_id": ObjectId(ticketId) })
    } catch (err) {
        console.log(`ERROR: cannot remove ticket ${ticketId}`)
        throw err;
    }
}
async function save(tickets) {
    const collection = await dbService.getCollection('ticket');
    try {
        await collection.insertMany(tickets);
    } catch (err) {
        console.log(`ERROR: cannot save ticket`)
        throw err;
    }
    return tickets;

}

async function getById(ticketid) {
    const collection = await dbService.getCollection('ticket');
    try {
        const ticket = await collection.findOne({ "_id": ObjectId(ticketid) });
        return ticket;

    } catch (err) {
        console.log(`ERROR: cannot getById ticket ${ticketid}`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}

module.exports = {
    query,
    remove,
    save,
    getById
}
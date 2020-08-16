const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    try {

        const collection = await dbService.getCollection('theater');
        const theaters = collection.find().toArray();
        return theaters;
    } catch (err) {
        console.log('ERROR: cannot find theaters')
        throw err;
    }
}

async function getById(theaterid) {
    const collection = await dbService.getCollection('theater');
    try {
        const theater = await collection.findOne({ "_id": ObjectId(theaterid) });
        return theater;

    } catch (err) {
        console.log(`ERROR: cannot getById theater ${theaterid}`)
        throw err;
    }
}

module.exports = {
    query,
    getById
}
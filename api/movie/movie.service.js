const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    try {

        const collection = await dbService.getCollection('movie');
        const movies = collection.find().toArray();
        return movies;
    } catch (err) {
        console.log('ERROR: cannot find movies')
        throw err;
    }
}

async function remove(movieId) {
    const collection = await dbService.getCollection('movie')
    try {
        await collection.deleteOne({ "_id": ObjectId(movieId) })
    } catch (err) {
        console.log(`ERROR: cannot remove movie ${movieId}`)
        throw err;
    }
}
async function save(movie) {
    const collection = await dbService.getCollection('movie');
    try {
        if (!movie._id) {
            await collection.insertOne(movie);
        } else {
            movie._id = ObjectId(movie._id);
            result = await collection.replaceOne({ "_id": movie._id }, { $set: movie });
            console.log(result);
        }

    } catch (err) {
        console.log(`ERROR: cannot save movie`)
        throw err;
    }
    return movie;

}

async function getById(movieid) {
    const collection = await dbService.getCollection('movie');
    try {
        const movie = await collection.findOne({ "_id": ObjectId(movieid) });
        return movie;

    } catch (err) {
        console.log(`ERROR: cannot getById movie ${movieid}`)
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
const dbService = require('../../services/db.service');
const theaterService = require('../theater/theater.service');
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('show');
        const shows = await collection.find(criteria).toArray();
        let theater;
        if (!shows || shows.length === 0)
            theater = await theaterService.getById(filterBy.theaterId);
        else {
            theater = shows[0].theater
            theater._id = ObjectId(theater._id);
        }


        const theaterId = theater._id;
        const theaterwidth = theater.width;
        const theaterHeight = theater.height;
        const seats = theater.seats;
        const theaterScreen = theater.screen;
        const theaterHall = theater.name;
        let show = { movieId: filterBy.movieId, theater: theater, date: filterBy.date, time: filterBy.time, theaterId, theaterwidth, theaterHeight, seats, theaterScreen, theaterHall };
        if (shows.length > 0 && shows[0]._id)
            show._id = shows[0]._id;
        show = await this.save(show);
        shows.push(show);

        return shows[0];
    } catch (err) {
        console.log('ERROR: cannot find shows')
        throw err;
    }
}

async function remove(showId) {
    const collection = await dbService.getCollection('show')
    try {
        await collection.deleteOne({ "_id": ObjectId(showId) })
    } catch (err) {
        console.log(`ERROR: cannot remove show ${showId}`)
        throw err;
    }
}
async function save(show) {
    const collection = await dbService.getCollection('show');
    try {
        if (!show._id) {
            await collection.insertOne(show);
        } else {
            show._id = ObjectId(show._id);
            show.theaterId = ObjectId(show.theaterId);
            result = await collection.replaceOne({ "_id": show._id, }, { $set: show });
            console.log(result);
        }

    } catch (err) {
        console.log(`ERROR: cannot save show`)
        throw err;
    }
    return show;

}

async function getById(showid) {
    const collection = await dbService.getCollection('show');
    try {
        const show = await collection.findOne({ "_id": ObjectId(showid) });
        return show;

    } catch (err) {
        console.log(`ERROR: cannot getById show ${showid}`)
        throw err;
    }
}

function _buildCriteria(filterBy) {

    const criteria = {};
    if (filterBy.theaterId)
        criteria.theaterId = ObjectId(filterBy.theaterId);
    if (filterBy.movieId)
        criteria.movieId = filterBy.movieId;
    if (filterBy.date)
        criteria.date = filterBy.date
    if (filterBy.time)
        criteria.time = filterBy.time
    return criteria;
}

module.exports = {
    query,
    remove,
    save,
    getById
}
const dbService = require('../../services/db.service');
const boardService = require('../movie/movie.service');

module.exports = {
    getByEmail,
    add
}

async function getByEmail(email) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${email}`)
        throw err;
    }
}
async function add(user) {
    console.log('user service back:', user);

    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(user);
        delete user.password;
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}
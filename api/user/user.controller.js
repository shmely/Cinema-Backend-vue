const userService = require('./user.service');

async function getUser(req, res) {
    const user = await userService.getById(req.params.id)
    res.send(user)
}


async function addUser(req, res) {
    const user = req.body;
    await userService.add(user)
    res.end()
}


module.exports = {
    getUser,
    addUser
}
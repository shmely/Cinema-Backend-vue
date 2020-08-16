const express = require('express')
const { addUser } = require('./user.controller');
const router = express.Router();
router.post('/', addUser);

module.exports = router
const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid');
const constants = require('../constants');
const eventController = require('../controllers/events.controller')


module.exports = router;
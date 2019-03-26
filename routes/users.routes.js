const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const  secure = require('../middlewares/secure.mid');
const constants = require('../constants');

router.get('/', secure.isAuthenticated, users.list);


module.exports = router;
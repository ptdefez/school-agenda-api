const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid');
const constants = require('../constants');

router.post('/classRoom/new',secure.checkRole(constants.ROLE_TUTOR).classroom.create);

module.exports = router;
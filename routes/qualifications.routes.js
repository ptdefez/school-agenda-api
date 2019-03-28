const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid');
const constants = require('../constants');
const qualificationController = require('../controllers/qualifications.controller')

router.post('/',secure.checkRole(constants.ROLE_TUTOR), qualificationController.create);

module.exports = router;

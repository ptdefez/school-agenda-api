const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid');
const constants = require('../constants');
const classroomsController = require('../controllers/classrooms.controller');

router.get('/',secure.checkRole(constants.ROLE_TUTOR), classroomsController.list);
router.post('/',secure.checkRole(constants.ROLE_TUTOR), classroomsController.create);
router.get('/:id',secure.checkRole(constants.ROLE_TUTOR), classroomsController.get);
router.put('/:id',secure.checkRole(constants.ROLE_TUTOR), classroomsController.update);
router.put('/:id/addStudent',secure.checkRole(constants.ROLE_TUTOR), classroomsController.addStudent);
router.put('/:id/expelStudent',secure.checkRole(constants.ROLE_TUTOR), classroomsController.expelStudent);
router.delete('/:id',secure.checkRole(constants.ROLE_TUTOR), classroomsController.delete);
 
module.exports = router;


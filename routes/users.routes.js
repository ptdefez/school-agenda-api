const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const  secure = require('../middlewares/secure.mid');
const constants = require('../constants');

router.get('/', secure.checkRole(constants.ROLE_TUTOR), usersController.list);
router.get('/:id', secure.isAuthenticated, usersController.getProfile);
// router.put('/:id', secure.isAuthenticated, usersController.updateProfile);
// router.delete('/:id', secure.checkRole(constants.ROLE_TUTOR), usersController.deleteUser);

module.exports = router;
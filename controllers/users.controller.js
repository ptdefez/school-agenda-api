const createError = require('http-errors');
const User = require('../models/User');
const passport = require('passport');

module.exports.list = (req, res, next) => {
    Users.find()
        .then(users => res.json(users))
        .catch(next);
}

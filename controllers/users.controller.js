const createError = require('http-errors');
const User = require('../models/User');
const passport = require('passport');

module.exports.list = (req, res, next) => {
    User.find()
        .then(users => res.json(users))
        .catch(next);
}

module.exports.getProfile = (req, res, next) => {
    User.findById(req.params.id)
        .populate('classroom')
        .populate( 'tutor')
        .then(user => {
            if (!user) {
                throw createError(404, 'User not found');
            } else {
                res.json(user);
            }
        })
        .catch(next);
}

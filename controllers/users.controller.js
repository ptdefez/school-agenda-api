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

module.exports.updateProfile = (req, res, next) => {
    delete req.body.name;
    const user = req.user;
    Object.keys(req.body).forEach(prop => user[prop] = req.body[prop]);
    if (req.file) user.avatarURL = req.file.secure_url;
 
    user.save()
        .then(user => res.status(201).json(user))
        .catch(next)
}
 
module.exports.deleteUser = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if(!user) {
                throw createError(404, 'user not found');
            } else {
                res.status(204).json();
            }
        })
        .catch(next);
}
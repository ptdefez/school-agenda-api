const createError = require('http-errors');
const User = require('../models/User');
const passport = require('passport');

module.exports.register = (req, res, next) => {
    User.findOne({ name: req.body.name })
        .then(user => {
            if (user) throw createError(409, 'User already registered')
            else return new User(req.body).save()
        })
        .then(user => res.status(201).json(user))
        .catch(next);
}
 
module.exports.authenticate = (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local-auth', (error, user, message) => {
        if (error) next (error)
        else if (!user) throw createError(401, message)
        else {
            req.login(user, error => {
                if (error) next(error)
                else res.status(201).json(user)
            })
        }
    })(req, res, next);
}
 
module.exports.logout = (req, res, next) => {
    req.logout();
    res.status(204).json();
}
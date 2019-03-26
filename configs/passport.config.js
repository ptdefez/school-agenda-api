const createError = require('http-errors');
const User = require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
 
module.exports.setup = (passport) => {
/**
   * Write user id at the session cookie
   */
  passport.serializeUser((user,next) => {
    next(null, user.id);
  });
 
   /**
   * Read user from the session cookie
   */
  passport.deserializeUser((id, next)=> {
    User.findById(id)
        .then(user => next(null, user))
        .catch(error => next(error));
  });
 
  passport.use('auth-local', new LocalStrategy({
      usernameField: 'name',
      passwordField: 'password'
  }, (name, password, next) => {
      User.findOne({ name: name })
        .then(user => {
            if (!user) {
                next(null, user, { user: 'Invalid user or password'});
            } else {
                return user.checkPassword(password)
                    .then(match => {
                        if(match) {
                            next(null, user);
                        } else {
                            next(null, user, { user: 'Invalid user or password'});
                        }
                    });
            }
        })
        .catch(error => next(error)); 

  }));
 
}
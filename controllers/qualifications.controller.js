const createError = require('http-errors');
const Qualification = require('../models/Qualification');
const Classroom = require('../models/Classroom');
const User = require('../models/User');

module.exports.create = (req, res, next) => {
    new Qualification(req.body).save()
        .then(qualification => res.status(201).json(qualification))
        .catch(next);
 
}

module.exports.list = (req, res, next) => {
    Qualification.find(req.query)
        .populate('student')
        .then(qualification => res.json(qualification))
        .catch(next)
}
 
module.exports.getOne = (req, res, next) => {
    Qualification.findById(req.params.id)
        .populate('student')
        .then(qualification => {
            if(!qualification) {
                throw createError(404, 'Qualification not found' )
            } else {
                res.json(qualification)
            }
        })
        .catch(next);
}
 
// module.exports.updateOne = (req, res, next) => {
   
// }
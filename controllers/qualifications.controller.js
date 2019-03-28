const createError = require('http-errors');
const Qualification = require('../models/Qualification');
const Classroom = require('../models/Classroom');
const User = require('../models/User');

module.exports.create = (req, res, next) => {
    Qualification.findOne({ examCode: req.body.examCode })
        .then(qualification => {
           if (qualification) throw createError(409, 'Qualification already registered')
            else return new Qualification(req.body).save()
        })
        .then(qualification => res.status(201).json(qualification))
        .catch(next);
 
}


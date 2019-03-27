const mongoose = require('mongoose');
const createError = require('http-errors');
 
const User = require('../models/User');
const Classroom = require('../models/Classroom');

module.exports.list = (req, res, next) => {
    Classroom.find()
        .populate('users')
        .then(classrooms => res.json(classrooms))
        .catch(next);
}
 
module.exports.get = (req, res, next) => {
    Classroom.findById(req.params.id)
        .populate('students', 'tutor')
        .then(classroom => {
            if (!classroom) {
                throw createError(404, 'Classroom not found');
            } else {
                res.json(classroom);
            }
        })
        .catch(next);
}
 
module.exports.create = (req, res, next) => {
    Classroom.findOne({ name: req.body.name})
        .then(classroom => {
           if (classroom) throw createError(409, 'Classroom already registered')
            else return new Classroom(req.body).save()
        })
        .then(classroom => res.status(201).json(classroom))
        .catch(next);
 
}
 
module.exports.update = (req, res, next) => {
    Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(classroom => {
            if (!classroom) {
                throw createError(404, 'Classroom not found')
            } else {
                res.json(classroom);
            }
        })
        .catch(next);
}
 
module.exports.addStudent = (req, res, next) => {
    User.findOne({ name: req.body.name})
        .then(user => {
            classroom.students.push(user)
            res.json(classroom);
        })
        .cacth(next);
}
 
module.exports.delete = (req, res, next) => {
    Classroom.findByIdAndDelete(req.params.id)
        .then(classroom => {
            if (!classroom) {
                throw createError(404, 'Classroom not found')
            } else {
                res.status(204).json()
            }
        })
        .catch(next);
}
 
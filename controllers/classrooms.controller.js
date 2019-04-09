const mongoose = require('mongoose');
const createError = require('http-errors');
 
const User = require('../models/User');
const Classroom = require('../models/Classroom');

module.exports.list = (req, res, next) => {
    Classroom.find()
        .populate('tutor')
        .then(classrooms => res.json(classrooms))
        .catch(next);
}
 
module.exports.get = (req, res, next) => {
    Classroom.findById(req.params.id)
        .populate({path : 'students', populate : {path : 'grades'}})
        .populate( 'tutor')
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
    Classroom.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
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
    User.findById(req.body.id)
        .then(user => {
            if (!user) {
                throw createError(404, 'User not found')
            } else {
                return Classroom.findById(req.params.id)
                .then(classroom => {
                    if (!classroom) {
                    throw createError(404, 'Classroom not found')
                    } else {
                        classroom.students.push(user.id)
                        return classroom.save()
                            .then(classroom => {
                                res.json(user);
                            })
                    }
                })                
               
            }          
            
        })
        .catch(next);
}

module.exports.expelStudent = (req, res, next) => {
    User.findOne({ _id: req.body.id})
        .then(user => {
            if (!user) {
                throw createError(404, 'User not found')
            } else {
                return Classroom.findById(req.params.id)
                .then(classroom => {
                    if (!classroom) {
                    throw createError(404, 'Classroom not found')
                    } else {
                        classroom.students = classroom.students.filter(student => student._id.toString() !== user._id.toString())
                        return classroom.save()
                            .then(() => {
                                res.json(user);
                            })
                    }
                })                
               
            }          
            
        })
        .catch(next);
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
 
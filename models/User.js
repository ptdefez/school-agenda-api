const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const constants = require('../constants');
const SALT_WORK_FACTOR = 10
const FIRST_TUTORS_EMAILS = process.env.FIRST_TUTORS_EMAILS.split(',').map(email => email.trim());
 
const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: [constants.ROLE_TUTOR, constants.ROLE_STUDENT],
        default: constants.ROLE_STUDENT
    },
    name:{
        type: String,
        require: [true, 'El campo es obligatorio'],
        // unique: true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        require: [true, 'El campo es obligatorio'],
        match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,10}$/, 'Formato de email no válido']
    },
    password: {
        type: String,
        // require: [true, 'El campo es obligatorio'],
        minlength: [6, 'Necesita al menos 6 caracteres']
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        // require: [true, 'El campo es obligatorio']
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // require: [true, 'El campo es obligatorio']
    },
    avatarURL: {
        type: String,
        match: [/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi, 'Invalid URL pattern' ]
    }
 
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            // delete ret,__v;
            delete ret.password;
            ret.grades = ret.grades || [];
            return ret;
        }
    }
})
 
userSchema.pre('save', function (next) {
    const user = this;
 
    if (FIRST_TUTORS_EMAILS.indexOf(user.email) !== -1) {
        user.role = constants.ROLE_TUTOR;
    }
    if (!user.isModified('password')) {
        next();
    } else {
        bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(salt => {
                return bcrypt.hash(user.password, salt)
                    .then(hash => {
                        user.password = hash;
                        next();
                    })
            })
            .catch(error => next(error))
    }
 
}); 
 
userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
}

userSchema.virtual('grades', {
    ref: 'Qualification',
    localField: '_id',
    foreignField: 'student',
    options: { sort: {date: 1}  }
})
 
const User = mongoose.model('User', userSchema);
module.exports = User;


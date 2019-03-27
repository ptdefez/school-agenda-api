const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const constants = require('../constants');
const SALT_WORK_FACTOR = 10
const FIRST_ADMIN_EMAIL = process.env.FIRST_ADMIN_EMAIL;
 
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
    }
 
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            // delete ret,__v;
            delete ret.password;
            return ret;
        }
    }
})
 
userSchema.pre('save', function (next) {
    const user = this;
 
    if (user.email === FIRST_ADMIN_EMAIL) {
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
 
const User = mongoose.model('User', userSchema);
module.exports = User;


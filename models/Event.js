const mongoose = require('mongoose');
const User = require('./User');

const eventSchema = new mongoose.Schema({
    kind: {
        type: String,
        enum: ['Homework', 'notice', 'excursion', 'request']
    },
    date: {
        type: Date
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Field is require']
    },
    title: {
        type: String
    },
    payment: {
        type: Boolean
    },
    consent: {
        type: Boolean
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
const mongoose = require ('mongoose');

const classroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is require']
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Tutor is require']
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

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

const Classroom = mongoose.model('Classroom', classroomSchema);
module.exports = Classroom;
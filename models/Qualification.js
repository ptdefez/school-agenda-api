const mongoose = require ('mongoose');

const qualificationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Field is require']
    },
    subject: {
       type: String,
       enum: ['Math','Leng', 'Engl', 'NatS', 'SocS' ]
    },
    theme: Number,
    date: Date,
    examCode: {
        type: String,
        required: [true, 'Field is require']
    },
    grade: {
        type: Number,
        min: 0,
        max: 10
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

qualificationSchema.index({ examCode: 1, student: 1}, { unique: true });

const Qualification = mongoose.model('Qualification', qualificationSchema);
module.exports = Qualification;
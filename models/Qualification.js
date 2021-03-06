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
    kind: {
        type: String,
        enum: ['Test', 'Trimester', 'Recovery']
    },
    number: Number,
    date: Date,
    examCode: {
        type: String,
        required: [true, 'Field is require']
    },
    classroom:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
    }, 
    grade: {
        type: Number,
        min: 0,
        max: 10
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

// classroomSchema.virtual('examStudent', {  
//     ref: 'Classroom',
//     localField: 'classroom',
//     foreignField: 'classroom',
//     options: { sort: {date: 1}  }
// })

qualificationSchema.index({ examCode: 1, student: 1}, { unique: true });

const Qualification = mongoose.model('Qualification', qualificationSchema);
module.exports = Qualification;
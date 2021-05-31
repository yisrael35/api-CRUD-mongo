const mongoose = require('mongoose')
const validator = require('validator')

var guideSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    cellular: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('cellular must be a postive number')
            }
        }
    }
}, { timestamps: true }
);

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide
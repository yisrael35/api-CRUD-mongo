const mongoose = require('mongoose');
const id_validator = require ('mongoose-id-validator');

var tourSchema = new mongoose.Schema({
    name: {//name || need to check if have auto id
        type: String,
        required: true,
        trim: true
    },
    start_date: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,//need to check if int exist
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    guide: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide',required:true},
}, { timestamps: true });
tourSchema.plugin(id_validator);
tourSchema.index("completed");


const Tour = mongoose.model('Tour', tourSchema );

module.exports = Tour
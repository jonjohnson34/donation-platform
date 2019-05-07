const mongoose = require("mongoose");

const programSchema = mongoose.Schema({
    program_name: {
        type: String, 
        required: true
    },
    program_desc: {
        type: String,
        required: true
    },
    amount_requested: {
        type: Number,
        required: true
    },
    amount_donated:{
        type: Number, 
        required: true
    },
    created_on: {
        type: Date,
        required: true,
        default: new Date()
    },
    user_creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    agency_creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency',
        required: true
    }
});

module.exports = mongoose.model("Program", programSchema);
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
    }
});

module.exports = mongoose.model("Program", programSchema);
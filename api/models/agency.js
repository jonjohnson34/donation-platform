

const mongoose = require("mongoose");

const agencySchema = mongoose.Schema({
    agency_name: {
        type: String, 
        required: true
    },
    ein: {
        type: String,
        required: true
    },
    address_1: {
        type: String,
        required: true
    },
    address_2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip_code: {
        type: String,
        required: true
    },
    validated: {
        type: Boolean,
        default: false
    },
    created_on: {
        type: Date,
        required: true,
        default: new Date()
    }, 
    user_creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
});

module.exports = mongoose.model("Agency", agencySchema);
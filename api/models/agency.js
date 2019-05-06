

const mongoose = require("mongoose");

const donorSchema = mongoose.Schema({
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
        required: true
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
    created_on: {
        type: Date,
        required: true,
        default: new Date()
    }
});

module.exports = mongoose.model("Agency", agencySchema);
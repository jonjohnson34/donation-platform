const mongoose = require("mongoose");

const donorSchema = mongoose.Schema({
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

module.exports = mongoose.model("Donor", donorSchema);
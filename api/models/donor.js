const mongoose = require("mongoose");

const donorSchema = mongoose.Schema({
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

module.exports = mongoose.model("Donor", donorSchema);
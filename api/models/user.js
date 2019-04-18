const mongoose = require("mongoose");
const uniqueVaidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true 
    },

    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: { //donor, agency, admin
        type: String,
        require: true
    } 
});

userSchema.plugin(uniqueVaidator);
module.exports = mongoose.model("User", userSchema);

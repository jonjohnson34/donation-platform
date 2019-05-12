const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const User = require('../models/user');

exports.createUser = (req, res, next) => {
    User.findOne({ email: req.body.email }).exec()
        .then(user => {
            if (!user) {
                const newUser = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role
                });

                newUser.save().then(result => {
                    res.status(200).json({
                        message: 'New user created',
                        result: result
                    });
                });
            }
            else {
                return res.status(401).json({
                    message: 'This user email already exist. Please register with another one.'
                });
            }
        });
};

exports.userLogin = (req, res, next) => {
    
};

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .exec().then(result => {
            res.status(200).json({
                message: 'User Found',
                result: result
            });
        }).catch(error => {
            res.status(500).json({ message: error });
        });
};

exports.removeUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id }).exec()
        .then(result => {
            res.status(200).json({
                message: 'User Removed from database',
                result: result
            });
        }).catch(error => {
            res.status(500).json({ message: error });
        });
};


/* Add these later */
exports.forgotPassword = (req, res, next) => {
};

exports.resetPassword = (req, res, next) => {
};

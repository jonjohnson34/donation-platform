const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const User = require('../models/user');

exports.createUser = (req, res, next) => {
    User.findOne({ email: req.body.email }).exec()
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 8)
                    .then(hashedPassword => {
                        const newUser = new User({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            password: hashedPassword,
                            role: req.body.role
                        });
                        newUser.save().then(result => {
                            res.status(200).json({
                                message: 'New user created',
                                result: result
                            });
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

exports.userLogin = (req, res   ) => {
    let fetchedUser;
    let email = req.body.email;
    let pass = req.body.password;
    User.findOne({ email: email }).exec()
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: 'Login failed, invalid user email or user password.'
          });
        }
  
        fetchedUser = user;
        bcrypt.compare(pass, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: 'Authentication failed.'
            });
          } if (result) {
            const token = jwt.sign(
              {
                email: fetchedUser.email,
                userID: fetchedUser._id,
                role: fetchedUser.role,
                first_name: fetchedUser.first_name,
                last_name: fetchedUser.last_name,
                phone_number: fetchedUser.phone_number
              }, 'I am an idito,',
             // process.env.JWT_KEY,
              { expiresIn: '1h' }
            );
  
            res.status(200).json({
              token: token,
              expiresIn: 3600,
              userID: fetchedUser._id,
              role: fetchedUser.role
            });
          } else {
            return res.status(401).json({
              message: 'Login failed, invalid user email or user password.'
            });
          }
        });
      })
      .catch(err => {
        return res.status(401).json({
          message: 'Authentication failed.'
        });
      });
    
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

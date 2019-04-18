const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const User = require('../models/user');
const Profile = require('../models/profile');
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

userId = new mongoose.Types.ObjectId();

exports.createUser = (req, res, next) => {

  User.findOne({ email: req.body.email }).exec()
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10)
          .then(hashedPassword => {
            const user = new User({
              email: req.body.email,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              password: hashedPassword,
              role: req.body.role
            });
          
            user.save()
              .then(result => {           
                res.status(201).json({
                  message: 'New user succesfully created',
                  result: result
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
          });
      } else {
        return res.status(401).json({
          message: 'This user email already exist. Please register with another one.'
        });
      }
    });

};

exports.userLogin = (req, res, next) => {
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
            { email       : fetchedUser.email, 
              userID      : fetchedUser._id, 
              role        : fetchedUser.role, 
              first_name  : fetchedUser.first_name, 
              last_name   : fetchedUser.last_name,
              phone_number: fetchedUser.phone_number
            },
            process.env.JWT_KEY,
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
  User.findById(req.params.id).populate('profile').exec()
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User resource not found" });
      }
    });
};

exports.getAllUsers = (req, res, next) => {
  User.find({}, { _id: 0, email: 1, first_name: 1, last_name: 1, role: 1}).exec()
    .then(user => {
      if (user){
        res.status(200).json({message: 'Everybody Found', data: user});
      }
      else {
        res.status.json({message: 'User resource not found'});
      }
    })
}


exports.forgotPassword = (req, res, next) => {
  let email = req.body.email;
  User.findOne({ email: email }).exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Invalid user email'
        });
      }

      fetchedUser = user;

      const msg = {
        to: fetchedUser.email,
        from: 'info@theburbz.com',
        subject: 'Reset your Burbz password',
        html: '<div>'+
        '<p>'+ fetchedUser.first_name +',</p>'+
        '<p></p>' + 
        '<p>Click <a href="' 
                  + process.env.FRONTEND_URL 
                  + '/edit/profile/update-password/'
                  + fetchedUser._id + '">here </a> to reset your password </p>' +
        '<p></p>' +
        '<p>Email <a mailto:>info@theburbz.com </a> if you have any issues.' +
        '<p></p>' +
        '<p>Thanks BURBZ, Inc </p>' + 
        '</div>'
      }

      sgMail.send(msg);
      res.status(200).json({ message: 'reset email sent' });
    })
    .catch(err => {
      res.status(404).json({
        error: err
      });
    });
};

exports.resetPassword = (req, res, next) => {
  User.findById(req.body.userID).exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Invalid user email'
        });
      }

      let fetchedUser = user;
      let newPassword = bcrypt.hash(req.body.newPassword, 10)
        .then(hashedPassword => {
          User.updateOne({ _id: fetchedUser._id }, { password: hashedPassword }).exec()
            .then(password => {
              if (!password) {
                return res.status(404).json({
                  message: 'User Not Found'
                });
              } else {
                res.status(200).json({ 
                  message: 'Password Reset Sucessfully' 
                });
              }
            });
        });
    });
}
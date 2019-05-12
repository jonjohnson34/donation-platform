const mongoose = require('mongoose');
const Donor = require('../models/donor');

exports.createDonor = (req, res, next) => {
    const newDonor = new Donor({
        address_1: req.body.address_1,
        address_2: req.body.address_2,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        user_creator: req.userData.userID
    });

    newDonor.save().then(result => {
        res.status(200).json({
            message: 'New Donor Profile Created',
            data: result
        });
    }).catch(error => {
        res.status(500).json({ message: error.message });
    });
}

exports.updateDonor = (req, res, next) => { 
    Donor.update( { _id: req.params.id }, {  
        $set: {
            address_1: req.body.address_1,
            address_2: req.body.address_2,
            city: req.body.city,
            state: req.body.state,
            zip_code: req.body.zip_code,    
        }
    }).exec().then(result => {
      res.status(200).json({
          message: 'Your Profile has been updated',
          data: result
      });  
    }).catch(error => {
        res.status(500).json({ message: error.message });
    });
}

exports.getDonor = (req, res, next) => {
    Donor.findById({ _id: req.params.id })
        .exec().then(result => {
            res.status(200).json({
                message: 'Donor Found',
                data: result
            });
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
}
 
exports.removeDonor = (req, res, next) => {
    Donor.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'Donor Removed'
            });
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
}
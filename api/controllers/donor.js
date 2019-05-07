const mongoose = require('mongoose');
const Donor = require('../models/donor');

exports.createDonor = (req, res, next) => {
    const newDonor = new Donor({
        address_1: req.body.address_1,
        address_2: req.body.address_2,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
    //    user_creator: req.userData.userID
    });

    newDonor.save().then(result => {
        res.status(200).json({
            message: 'New Donor Profile Created',
            result: result
        });
    });
}

exports.updateDonor = (req, res, next) => { 

}

exports.getDonor = (req, res, next) => {

}
 
exports.removeDonor = (req, res, next) => {
    
}
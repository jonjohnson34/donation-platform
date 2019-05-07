const mongoose = require("mongoose");
const Agency = require('../models/agency');

exports.createAgency = (req, res, next) => {
    const newAgency = new Agency({
        agency_name: req.body.agency_name,
        ein: req.body.ein,
        address_1: req.body.address_1,
        address_2: req.body.address_2,
        city: req.body.city,
        state: req.body.state,
        user_creator: req.userData.userID
    });

    newAgency.save().then(result => {
        res.status(200).json({
            message: 'New Agnecy created',
            result: result
        })
    })
}

exports.updateAgency = (req, res, next) => {

}

exports.getOneAgency = (req, res, next) => {

}

exports.removeAgency = (req, res, next) => {

}
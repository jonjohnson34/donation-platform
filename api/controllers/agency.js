const mongoose = require("mongoose");
const Agency = require('../models/agency');


async function createAgency(req, res){
    const newAgency = new Agency({
        agency_name: req.body.agency_name,
        ein: req.body.ein,
        address_1: req.body.address_1,
        address_2: req.body.address_2,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        user_creator: req.body.userID //this will change back to userData
    });
    
    newAgency.save().then(results => {
        res.status(200).json({
            message: 'Agency Created',  
            data: results
        });  
    }).catch(error => {
        res.status(500).json({
            message: error.message
        });
    });
}

async function updateAgency(req, res) {
    //Remember to pass the whole object from the front end//
    Agency.updateOne({ _id: req.params.id}, {
        $set: {
            //add verified to this
            agency_name: req.body.agency_name,
            ein: req.body.ein,
            address_1: req.body.address_1,
            address_2: req.body.address_2,
            city: req.body.city,
            state: req.body.state,
            zip_code: req.body.zip_code
        }
    }).then(result => {
        res.status(200).json({
            message: 'agnecy updated',
            data: result
        });
    }).catch(error => {
        res.status(500).json({ message: error.message });
    });
}

async function getOneAgency(req, res){
    Agency.findById({ _id: req.params.id })
        .exec().then(results => {
            res.status(200).json({
                message: 'Agency Found',
                data: results
            });
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
}

async function getAgencies(req, res) {
    Agency.find().then(results => {
        res.status(200).json({
            message: "Agency Fetched",
            data: results
        }); 
    }).catch(error => {
        res.status(500).send({ message: error.message });
    });
}

async function removeAgency(req, res) {
   Agency.deleteOne({ _id: req.params.id })
        .then(results => {
            res.status(200).json({
                message: 'Agency Removed',
                data: results
            });
        }).catch(error => {
            res.status(500).send({ message: error.message });
        });
}
 
module.exports = { createAgency, getAgencies, removeAgency, updateAgency, getOneAgency };

const mongoose = require('mongoose');
const Program = require('../models/program');

exports.createProgram = (req, res, next) => {
    const newProgram = {
        program_name: req.body.program_name,
        program_desc: req.body.program_desc,
        amount_requested: req.body.amount_requested,
        amount_donated: req.body.amount_donated,
        //user_creator: req.userID.userID,
        //agency_creator: req.body.agnecyID
    }

    Program.save().then(result => {
        res.status(200).json({
            message: 'New Program Created',
            result: result
        });
    });
    
}

exports.updateProgram = (req, res, next) => {
    Program.update({ _id: req.params.id }, {
        $set: {
            program_name: req.body.program_name,
            program_desc: req.body.program_desc,
            amount_requested: req.body.amount_requested,
            amount_donated: req.body.amount_donated,
        }
    });
}

exports.getAllPrograms = (req, res, next) => {
    Program.find().exec()
        .then(result => {
            res.status(200).json({
                message: 'All Programs Found',
                result: result
            });
        });
}

exports.getOneProgram = (req, res, next) => {
    Program.findById({ _id: req.params.id })
        .exec().then(result => {
            res.status(200).json({
                message: 'Program Found',
                result: result
            });
        });
}

exports.removeProgram = (req, res, next) => {
    Program.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'Program Removed'
            });
        });
}
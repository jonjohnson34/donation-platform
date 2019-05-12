const express = require('express');
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const agencyController = require('../controllers/agency');

/************POST ROUTES ***************/
router.post('/create', agencyController.createAgency); //Re-add CheckAuth
/************POST ROUTES ***************/

/************PUT ROUTES ***************/
router.put('/edit/:id',  agencyController.updateAgency); //Re-add CheckAuth
/************PUT ROUTES ***************/

/************GET ROUTES ***************/
router.get('/getOne/:id', agencyController.getOneAgency); //Re-add CheckAuth
router.get('/getAll', agencyController.getAgencies); //Re-add CheckAuth
/************GET ROUTES ***************/

/************DELETE ROUTES ***************/
router.delete('/remove/:id', agencyController.removeAgency); //Re-add CheckAuth
/************DELETE ROUTES ***************/

module.exports = router;
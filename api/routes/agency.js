const express = require('express');
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const agencyController = require('../controllers/agency');

/************POST ROUTES ***************/
router.post('/create', checkAuth, agencyController.createAgency);
/************POST ROUTES ***************/

/************PUT ROUTES ***************/
router.put('/edit/:id', checkAuth, agencyController.updateAgency);
/************PUT ROUTES ***************/

/************GET ROUTES ***************/
//router.get('/getOneAgency/:id', checkAuth, agencyController.getOneAgency);
/************GET ROUTES ***************/

/************DELETE ROUTES ***************/
router.delete('/remove/:id', checkAuth, agencyController.removeAgency);
/************DELETE ROUTES ***************/


module.exports = router;
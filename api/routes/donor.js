const express = require('express');
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const donorController = require('../controllers/donor');

/************POST ROUTES ***************/
router.post('/create', checkAuth, donorController.createDonor);
/************POST ROUTES ***************/

/************PUT ROUTES ***************/
router.put('/edit/:id', checkAuth, donorController.updateDonor);
/************PUT ROUTES ***************/

/************GET ROUTES ***************/
router.put('/getDonor/:id', checkAuth, donorController.getDonor);
/************GET ROUTES ***************/

/************DELETE ROUTES ***************/
router.delete('/remove/:id', checkAuth, donorController.removeDonor);
/************DELETE ROUTES ***************/


module.exports = router;
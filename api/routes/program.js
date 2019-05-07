const express = require('express');
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const programController = require('../controllers/program');

/************POST ROUTES ***************/
router.post('/create', checkAuth, programController.createProgram);

/************POST ROUTES ***************/

/************PUT ROUTES ***************/
router.put('/edit/:id', checkAuth, programController.updateProgram);
/************PUT ROUTES ***************/

/************GET ROUTES ***************/
//router.get('/getAllPrograms', checkAuth, programController.getAllPrograms);
//router.get('/getOneProgram/:id', checkAuth, programController.getOnePrograms);
/************GET ROUTES ***************/

/************DELETE ROUTES ***************/
router.delete('/remove/:id', checkAuth, programController.removeProgram);
/************DELETE ROUTES ***************/


module.exports = router;
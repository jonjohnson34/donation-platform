const express = require('express');
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const userController = require('../controllers/user');


/*********POST ROUTES ***********/
router.post('/signup', userController.createUser);
router.post('/login', userController.userLogin);

/*********POST ROUTES ***********/


/************************** GET ROUTES **************************/
router.get("/", checkAuth, userController.getAllUsers);
router.get("/:id", checkAuth, userController.getOneUser);
/************************** GET ROUTES **************************/

module.exports = router;

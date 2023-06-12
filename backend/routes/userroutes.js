const router = require("express").Router();

const  userControllers = require('../controller/usercontrollers');


router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);


module.exports = router;
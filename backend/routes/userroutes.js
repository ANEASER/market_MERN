const router = require("express").Router();

const  userControllers = require('../controller/usercontrollers');


router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router.get("/profile",userControllers.UserProfile);
router.get("/logout", userControllers.Logout);

module.exports = router;
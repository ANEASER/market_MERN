const router = require("express").Router();

const  userControllers = require('../controller/usercontrollers');
const Auth = require('../middleware/auth');

router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router.get("/profile",userControllers.UserProfile);
router.get("/logout", userControllers.Logout);

router.route("/generateOTP").get(userControllers.verifyUser,Auth.localVariable,userControllers.generateOTP);

router.get('/verifyOTP',userControllers.verifyOTP);
router.get('/createresetsession',userControllers.createResetSession);

router.route('/resetpassword').put(userControllers.verifyUser, userControllers.resetPassword);

module.exports = router;
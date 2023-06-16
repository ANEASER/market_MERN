const router = require("express").Router();

const  userControllers = require('../controller/usercontrollers');
const Auth = require('../middleware/auth');
const Mail = require('../controller/mailer');

router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router.get("/profile",userControllers.UserProfile);
router.get("/logout", userControllers.Logout);


router.get('/verifyOTP',userControllers.verifyOTP);
router.get('/createresetsession',userControllers.createResetSession);

//router.route('/resetpassword').put(userControllers.verifyUser, userControllers.resetPassword);
router.post('/registermail', Mail.registerMail);

module.exports = router;
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const secret = "asdad(&^(^swsfsfd";
const otpGenerator = require('otp-generator');


const registerUser = async (req, res, next) => {
    let user;
  
    const {  username, password, email,firstname, lastname } = req.body;
  
    try {
      const userDoc = await User.create({ 
        username, 
        password:bcrypt.hashSync(password,salt) , // npm install bcrypts
        email,
        firstname,
        lastname
      });
      user = userDoc.toObject();
      
      // Additional success alert
      const token = jwt.sign({ username, id: userDoc._id }, secret);
      res.cookie('token', token, { httpOnly: true }).json(userDoc);
  
    } catch (err) {
      // Error alert
      const errorMessage = "User registration failed. Please try again.";
      return res.status(500).json({ error: errorMessage });
    }
};


const loginUser = async (req, res, next) => {
  const { username, password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  
  if (passOk){
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token',token).json({
        id:userDoc._id,
        username
      });
    });    
  } else {
    res.status(400).json('wrong credentials');
  }
}

// load profile
const UserProfile = async (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token,secret,{},(err,info) => {// (token,secret,object,callback)
    if (err) throw err;
    res.json(info);
  });  
} 

// logout
const Logout = async (req, res) => {
  res.cookie('token','').json('ok');
}



// verify user
const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.query;

    
    let exist = await User.findOne({ username: { $regex: new RegExp(username, 'i') } });

    if (!exist) {
      return res.status(404).send({ error: "Can't find User!" });
    }

    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
};



// Verify OTP
const verifyOTP = async (req, res) => {
  const { code } = req.query;
  
  console.log(req.app.locals.OTP);

  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(201).send({ msg: 'Verify Successfully' });
  }

  return res.status(400).send({ error: "Invalid OTP" });
}


//successfull redirect user when OTP is valid
const createResetSession = (req,res) => {
  if(req.app.locals.resetSession){  
    req.app.locals.resetSession = false; // allow access to this route only once if not reset the session
    return res.status(201).send({ msg : "access granted"});
  }
  return res.status(440).send({error: "Session expired"});
}

// reset password Component
const resetPassword = async (req, res) => {


  if(!req.app.locals.resetSession) return res.status(440).send({ error : "Session expired"})  // if req.app.locals.resetSession is false this return error

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "Username not found" });
    }

    const hashedPassword = await bcrypt.hash(password, salt);
    await User.updateOne({ username: user.username }, { password: hashedPassword });

    return res.status(201).send({ msg: "Record Updated ...!" });
  } catch (error) {
    return res.status(500).send({ error: "Failed to update password" });
  }
};




exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.UserProfile = UserProfile;
exports.Logout = Logout;
exports.verifyOTP = verifyOTP;
exports.verifyUser = verifyUser;
exports.createResetSession = createResetSession;
exports.resetPassword = resetPassword;
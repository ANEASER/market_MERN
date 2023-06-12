const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const secret = "asdad(&^(^swsfsfd";

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
      res.cookie('token',token).json('ok');
    });    
  } else {
    res.status(400).json('wrong credentials');
  }
}

exports.registerUser = registerUser;
exports.loginUser = loginUser;
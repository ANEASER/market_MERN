// npm install nodemailer
// npm install Mailgen 

require('dotenv').config(); 
const nodemailer = require('nodemailer');
//const Mailgen = require('mailgen');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
       user: process.env.EMAIL,
       pass: process.env.PASSWORD   // we need to setup google account settings to 2 step verifications then app password
    },

    tls: {
        rejectUnauthorized: false
    }
 });

const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    // body of the email
    var email = {
        body : {
            name: username,
            intro : text || 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    
    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: subject,
        html: "Test <button>sending</button> Gmail using Node JS"
     };



    // send mail
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
           console.log(error);
        }else{
           console.log("Email sent: " + info.response);
        }
     });
     

}

exports.registerMail = registerMail;
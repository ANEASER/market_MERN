require('dotenv').config();
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

const generateOTP = () => {
  return otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  });
};

const registerMail = async (req, res) => {
  const { username, email } = req.body;

  const otp = generateOTP();
  console.log(otp);
  req.app.locals.OTP = otp  // save the otp in the middlewhere

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Registration Email",
    html: `
      <h2>Registration Email</h2>
      <p>Hello ${username},</p>
      <p>Your One-Time Password (OTP) is: <strong>${otp}</strong></p>
      <p>If you have any questions or need assistance, feel free to reply to this email.</p>
      <p>Thank you!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
};

module.exports = { generateOTP, registerMail };

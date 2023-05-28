const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USERID,
    pass: process.env.PASSWORD
  }
});

const sendEmail = ({toEmail,subject,body}) => {

    const mailOptions = {
      from: process.env.USERID,
      to: toEmail,
      subject: subject,
      text: body
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

//sendEmail({toEmail:"gowthamnickmystic@gmail.com",subject:"Test Mail",body:"Test Mail"});

module.exports.sendEmail = sendEmail;
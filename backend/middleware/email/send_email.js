const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USERID,
    pass: process.env.SMTP_PASSWORD
  }
});

const sendEmail = ({toEmail,subject,body}) => {

    const mailOptions = {
      from:process.env.SMTP_FROM_ADDRESS,
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
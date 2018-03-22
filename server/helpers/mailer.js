const nodemailer = require('nodemailer');
const settings = require('../../config/mailer.js');

//configure nodemailer

const mailer = {

  transporter: nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: settings.user,
      pass: settings.pass
    },
    tls: {
      rejectUnauthorized: false
    }
  }),

  email: (userEmail, subject, text) => {
    let HelperOptions = {
      from: `"Skillsource" <${settings.user}>`,
      to: userEmail,
      subject: subject,
      text: text
    }

    mailer.transporter.sendMail(HelperOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("The message was sent!");
      console.log(info);
    });
  }
}

module.exports = mailer;




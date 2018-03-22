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

  unsentEmails: [],

  emailCourses: {},

  email: (userEmail, courseId, subject, text) => {

    console.log("in email funciton");
    if (mailer.emailCourses[userEmail]) {
      if (mailer.emailCourses[userEmail] && mailer.emailCourses[userEmail].includes(courseId)) {
        return;
      } else {
        mailer.emailCourses[userEmail].push(courseId);
      }
    } else {
      mailer.emailCourses[userEmail] = [courseId];
    }

    let HelperOptions = {
      from: `"Skillsource" <${settings.user}>`,
      to: userEmail,
      subject: subject,
      text: text
    }

    mailer.unsentEmails.push(mailer.transporter.sendMail(HelperOptions));
    console.log(mailer.unsentEmails);
  }
}

module.exports = mailer;




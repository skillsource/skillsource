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

  remind: (userEmail, courseId, subject, text) => {
    let HelperOptions = {
      from: `"Skillsource" <${settings.user}>`,
      to: userEmail,
      subject: subject,
      text: text
    }
    //store the unsent email as a Promise.  node-schdule will resolve all unsent emails at 12:30pm each day

    mailer.unsentEmails.push(mailer.transporter.sendMail(HelperOptions));  
    console.log(mailer.unsentEmails, 'in remind function');

  },

  email: (userEmail, courseId, subject, text) => {

    //only schedule a new email if the user doesn't already have one scheduled for that particular course

    if (mailer.emailCourses[userEmail]) {
      if (mailer.emailCourses[userEmail].includes(courseId)) {
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

    //store the unsent email as a Promise.  node-schdule will resolve all unsent emails at 12:30pm each day

    mailer.unsentEmails.push(mailer.transporter.sendMail(HelperOptions));  
  }
}

module.exports = mailer;




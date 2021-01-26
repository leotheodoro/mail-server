const mailer = require('nodemailer');
require('dotenv/config')

module.exports = (email, name, subject, message) => {
  const smtpTransport = mailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    }
  });

  const mail = {
    from: `${name} <${email}>`,
    to: process.env.MAIL_USER,
    subject: `Acontece Construtora Site | ${subject}`,
    text: message
  }

  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(mail).then(response => {
      smtpTransport.close();
      return resolve(response);
    }).catch(error => {
      smtpTransport.close();
      return reject(error);
    });
  })
}
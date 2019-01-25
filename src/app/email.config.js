const nodeMailer = require('nodemailer');

var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vidracariamc1@gmail.com',
      pass: 'McV1dr@.10'
    }
});

module.exports = transporter;
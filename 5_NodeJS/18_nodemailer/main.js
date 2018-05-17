var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'reyescristiane@gmail.com',
    pass: 'NadineWolf'
  }
}));

var mailOptions = {
  from: 'reyescristiane@gmail.com',
  to: 'friendsgmailacc@gmail.com',
  subject: 'Sending Email using Node.js[nodemailer]',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});  



// Configurar nodemailer y el servidor smtp
var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'reyescristiane@gmail.com',
    pass: 'NadineWolf'
  }
}));

var mailOptions = {
  from: 'reyescristiane@gmail.com',
  to: 'creyes.dev@gmail.com',
  subject: 'Sending Email using Node.js[nodemailer]',
  text: 'That was easy!'
};


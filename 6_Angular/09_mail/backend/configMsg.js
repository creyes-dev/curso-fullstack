const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = formulario => {

  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'reyescristiane@gmail.com',
      pass: 'MasterWolf6'
    }
  }));

  const mailOptions = {
    from: '"${formulario.nombre}" <${formulario.email}>',
    to: "reyescristiane@gmail.com", 
    subject: formulario.asunto,
    html: `
    <strong>Nombre:</strong> ${formulario.nombre} <br/> 
    <strong>E-mail:</strong> ${formulario.email}  <br/> 
    <strong>Mensaje:</strong> ${formulario.mensaje}`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    console.log('mailOptions:');
    console.log(mailOptions);
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 

};

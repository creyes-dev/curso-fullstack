var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

  /* POST enviar email */
  router.post('/', function(req, res, next){
    //res.render('usuario/perfil');
    var formulario = req.body;

    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'mail@gmail.com',
        pass: 'pass'
      }
    }));

    const mailOptions = {
      from: '"${formulario.nombre}" <${formulario.email}>',
      to: "mail@gmail.com", 
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
        res.status(200).send();
      }
    }); 

  });

  module.exports = router;
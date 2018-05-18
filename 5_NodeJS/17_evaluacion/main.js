var http = require("http");
var url = require("url");
var fs = require("fs");
var querystring = require("querystring");
var mime = require("mime");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

var mime = {
    'html' : 'text/html',
    'css'  : 'text/css',
    'jpg'  : 'image/jpg',
    'ico'  : 'image/x-icon',
    'mp3'  : 'audio/mpeg3',
    'mp4'  : 'video/mp4',
    'js'   : 'text/javascript',
    'png'  : 'image/png'
 };

// Configurar el servidor web e iniciarlo
var servidor = http.createServer(function(pedido, respuesta) {
  var objetourl = url.parse(pedido.url);
  var camino = "public" + objetourl.pathname;
  if (camino == "public/") camino = "public/index.html";
  encaminar(pedido, respuesta, camino);
});

function enviar_mail(emailDestino, mensaje, callback){
  var mailEnviado = false;
  var errorCapturado = null;

  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "xxxxxx@gmail.com",
        pass: "xxxxxx"
      }
    })
  );

  var mailOptions = {
    from: "xxxxxxxx@gmail.com",
    to: emailDestino,
    subject: "Email enviado usando Node.Js[nodemailer]",
    text: mensaje
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      errorCapturado = error;
    } else {
      mailEnviado = true;
    }
    callback(mailEnviado, errorCapturado);
  });
}

function encaminar(pedido, respuesta, camino) {

  switch (camino) {
    case "public/recuperardatos": {
      recuperar(pedido, respuesta);
      break;
    }
    default: {
      fs.exists(camino, function(existe) {
        if (existe) {
          fs.readFile(camino, function(error, contenido) {
            if (error) {
              respuesta.writeHead(500, { "Content-Type": "text/plain" });
              respuesta.write("Error interno");
              respuesta.end();
            } else {
              var vec = camino.split(".");
              var extension = vec[vec.length - 1];
              var mimearchivo = mime[extension];
              respuesta.writeHead(200, { "Content-Type": mimearchivo });
              respuesta.write(contenido);
              respuesta.end();
            }
          });
        } else {
          respuesta.writeHead(404, { "Content-Type": "text/html" });
          respuesta.write(
            "<!doctype html><html><head></head><body>Recurso inexistente</body></html>"
          );
          respuesta.end();
        }
      });
    }
  }
}

servidor.listen(8888);
console.log('Servidor web iniciado');

//la función recuperar  se encarga de recuperar los dos datos del formulario
//y generar un archivo HTML para retornarlo al navegador
function recuperar(pedido, respuesta) {

    var info = '';    
    pedido.on('data', function(datosparciales) {
        info += datosparciales;
      });

      pedido.on('end', function() {
        var formulario = querystring.parse(info);
        var emailDestino = formulario['email'];
        var mensaje = formulario['mensaje'];

        enviar_mail(emailDestino, mensaje, function(enviado, error){
          if(enviado){
            respuesta.writeHead(200, { "Content-Type": "text/html" });
            var pagina =
              "<!doctype html><html><head></head><body> <h1>Email enviado</h1> " +
              "Email origen: " +
              emailDestino +
              "<br>" +
              "Mensaje: " +
              mensaje +
              "<br>" +
              '<a href="index.html">Retornar</a>' +
              "</body></html>";
            respuesta.end(pagina);
          } else {
            console.log(error);
          }
        });
      });
}

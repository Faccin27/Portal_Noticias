const express = require("express");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const router = require("./routes/router");
const path = require('path');
require('./utils/handlebars-helpers');

class App {
  constructor() {
    this.server = express();
    this.middleweres();
    this.routes();
  }

  // Função para configurar os middlewares
  middleweres() {
    // Configurando a pasta 'public' como estática para servir arquivos estáticos como CSS, imagens e JavaScript
    this.server.use(express.static('public'))
    this.server.use('/uploads', express.static('src/uploads'));


    // Configurando o body-parser para analisar o corpo das solicitações HTTP
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));

    // Configurando o Handlebars como mecanismo de template
    this.server.engine('handlebars', engine({
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      }
    }));
    this.server.set('view engine', 'handlebars');
    this.server.set("views", path.join(__dirname, 'views'));

    // Configurando o cookie-parser para analisar os cookies
    this.server.use(cookieParser());

    // Configurando um middleware para verificar o token JWT
    this.server.use((req, res, next) => {
      res.set('Cache-Control', 'no-store');
      let token = req.cookies["tokenJWT"];
      jwt.verify(token, 'chave_secreta', (err, user) => {
        if (user) req.id = user.id;
      });
      next();
    });
  }

  routes() {
    this.server.use(router);
  }
}

module.exports = new App().server;

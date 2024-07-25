// controllers/LoginController.js

const jwt = require('jsonwebtoken');
const UsuarioDAO = require('../models/dao/UsuarioDAO');

class LoginController {
  async login(req, res) {
    try {
      const { LoginEmail: email, LoginPassword: senha } = req.body;
      console.log('Dados recebidos:', req.body);

      // Verifica se o usuário existe
      const usuario = await UsuarioDAO.findOne({ email });

      if (!usuario || senha !== usuario.senha) {
        console.log("Usuário ou senha inválidos");
        return res.status(200).render('login', {
          message: 'Usuário ou senha inválidos'
        });
      }

      // Gera o token JWT
      const token = jwt.sign({ id: usuario.id }, 'chave_secreta', { expiresIn: '1H' });

      // Define o cookie com o token JWT
      res.cookie("tokenJWT", token);
      console.log('Login bem-sucedido');
      return res.redirect(301, '/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return res.send('Erro ao fazer login');
    }
  }
}

module.exports = new LoginController();

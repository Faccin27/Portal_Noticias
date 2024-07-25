// Importando os módulos necessários
const { Router } = require("express");
const router = new Router();
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const UsuarioDAO = require('../models/dao/UsuarioDAO');
const NoticiaDAO = require('../models/dao/NoticiaDAO');

let usuarioLogado;

async function getUsuarioLogado(req) {
  usuarioLogado = await UsuarioDAO.getById(req.id);
}

router.get('/', async (req, res) => {
  await getUsuarioLogado(req)

  let listaNoticias = await NoticiaDAO.getAll();

  if(usuarioLogado){
    console.log("TESTE",listaNoticias)
    res.status(200).render("dashboard", {
      usuarioLogado: usuarioLogado.get(),
      listaNoticias: listaNoticias
  })
  } else{
    res.status(200).render("dashboard", {
      listaNoticias: listaNoticias
    })
  }
});

router.get('/login', async (req, res) => {
  await getUsuarioLogado(req)
 if(!usuarioLogado){
  res.status(200).render("login")
 } else {
   return res.redirect('/');
 }

});

router.get('/noticias', async (req, res) => {  
  await getUsuarioLogado(req);  
  let listaNoticias = await NoticiaDAO.getAll();

  if (usuarioLogado) {
    res.status(200).render("all-news", {
      usuarioLogado: usuarioLogado.get(),
      listaNoticias: listaNoticias  
    });
  } else {
    res.status(200).render("all-news", {
      listaNoticias: listaNoticias
    });
  }
});


router.get('/register', (req, res) => {
  res.status(200).render("register")
});

router.get('/dashboard', (req, res) => {
  res.status(200).render("dashboard")
});


router.post('/register', RegisterController.register);
router.post('/login', LoginController.login);


router.get('/deslogar', (req, res) => {
  res.clearCookie('tokenJWT');
  return res.redirect(301, '/');
});



module.exports = router;
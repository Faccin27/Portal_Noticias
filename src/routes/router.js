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

router.get('/noticia/:id', async (req, res) => {
  await getUsuarioLogado(req);
  const noticiaId = req.params.id;

  try {
    const noticia = await NoticiaDAO.getById(noticiaId);

    if (!noticia) {
      return res.status(404).render("error", { message: "Notícia não encontrada" });
    }

    if (usuarioLogado) {
      res.status(200).render("news", {
        usuarioLogado: usuarioLogado.get(),
        noticia: noticia
      });
    } else {
      res.status(200).render("news", {
        noticia: noticia
      });
    }
  } catch (error) {
    console.error('Erro ao buscar notícia:', error);
    res.status(500).render("error", { message: "Erro ao carregar a notícia" });
  }
});

router.get('/register', async (req, res) => {
  await getUsuarioLogado(req);

  if(usuarioLogado){
    res.status(200).render("register")
  } else{res.redirect('/')}

});

router.post('/register', RegisterController.register);
router.post('/login', LoginController.login);

//postar
router.post('/noticias/create', async (req, res) => {
  await getUsuarioLogado(req);

  if (usuarioLogado) {
    const { title, description, content, category } = req.body;
    try {
      const newNoticia = await NoticiaDAO.create({
        idUsuario: usuarioLogado.id, categoria : category, titulo: title, descricao: description, conteudo: content
      });
      res.status(201).redirect("/noticias");

    } catch (error) {
      res.status(500).json({ error: 'erro ao criar postagem' })
    }
  } else {
    res.redirect('/login');
  }
});


router.get('/deslogar', (req, res) => {
  res.clearCookie('tokenJWT');
  return res.redirect(301, '/');
});



module.exports = router;
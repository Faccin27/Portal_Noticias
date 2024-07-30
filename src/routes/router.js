// Importando os módulos necessários
const { Router } = require("express");
const router = new Router();
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const UsuarioDAO = require('../models/dao/UsuarioDAO');
const NoticiaDAO = require('../models/dao/NoticiaDAO');
const ParceiroDAO = require("../models/dao/ParceiroDAO");
const EmpregoDAO = require('../models/dao/EmpregoDAO');
const EventoDAO = require('../models/dao/EventoDAO');
const { formatDate, formatDateWithoutTime, formatarData } = require('../utils/dateUtils');
const upload = require('../config/multer');

let usuarioLogado;

async function getUsuarioLogado(req) {
  usuarioLogado = await UsuarioDAO.getById(req.id);
}

router.get('/', async (req, res) => {
  await getUsuarioLogado(req)

  let listaEventos = await EventoDAO.getLatest(3);
  let listaEmpregos = await EmpregoDAO.getLatest(3);
  let listaNoticias = await NoticiaDAO.getLatest(6);
  let listaParceiros = await ParceiroDAO.getLatest(3);
  console.log(listaParceiros)


  listaEventos = listaEventos.map(evento => ({
    ...evento.dataValues,
    dataInicio: formatDate(evento.dataValues.dataInicio),
    dataFim: formatDate(evento.dataValues.dataFim),
    dataCriacao: formatDate(evento.dataValues.dataCriacao)
  }));

  listaParceiros = listaParceiros.map(parceiro => ({
    ...parceiro.dataValues,
    data_criacao: formatDateWithoutTime(parceiro.dataValues.data_criacao)
  }));

  if (usuarioLogado) {
    res.status(200).render("dashboard", {
      usuarioLogado: usuarioLogado.get(),
      listaNoticias,
      listaParceiros,
      listaEmpregos,
      listaEventos
    });
  } else {
    res.status(200).render("dashboard", {
      listaNoticias,
      listaParceiros,
      listaEmpregos,
      listaEventos
    });
  }
});

router.get('/login', async (req, res) => {
  await getUsuarioLogado(req)
  if (!usuarioLogado) {
    res.status(200).render("login")
  } else {
    return res.redirect('/');
  }
});

router.get('/eventos', async (req, res) => {
  await getUsuarioLogado(req);
  let listaEventos = await EventoDAO.getAll();
  
  listaEventos = listaEventos.map(evento => ({
    ...evento.dataValues,
    dataInicio: formatDate(evento.dataValues.dataInicio),
    dataFim: formatDate(evento.dataValues.dataFim),
    dataCriacao: formatDate(evento.dataValues.dataCriacao)
  }));

  if (usuarioLogado) {
    res.status(200).render("all-events", {
      usuarioLogado: usuarioLogado.get(),
      listaEventos
    });
  } else {
    res.status(200).render("all-events", {
      listaEventos
    });
  }
});

router.get('/evento/:id', async (req, res) => {
  await getUsuarioLogado(req);
  const eventoId = req.params.id;

  try {
    const evento = await EventoDAO.getById(eventoId);
    if (!evento) {
      return res.status(404).render("error", { message: "evento não encontrado" });
    }

    const eventoFormatado = {
      ...evento.dataValues,
      dataInicio: formatDate(evento.dataValues.dataInicio),
      dataFim: formatDate(evento.dataValues.dataFim),
      dataCriacao: formatDateWithoutTime(evento.dataValues.dataCriacao)
    };

    if (usuarioLogado) {
      res.status(200).render("events", {
        usuarioLogado: usuarioLogado.get(),
        evento: eventoFormatado
      });
    } else {
      res.status(200).render("events", {
        evento: eventoFormatado
      });
    }
  } catch (error) {
    console.error('Erro ao buscar evento:', error);
    res.status(500).render("error", { message: "Erro ao carregar o evento" });
  }
});

router.get('/empregos', async (req, res) => {
  await getUsuarioLogado(req);
  let listaEmpregos = await EmpregoDAO.getAll();

  listaEmpregos = listaEmpregos.map(emprego => ({
    ...emprego.dataValues,
    data_criacao: formatDateWithoutTime(emprego.dataValues.data_criacao)
  }));

  if (usuarioLogado) {
    res.status(200).render("all-jobs", {
      usuarioLogado: usuarioLogado.get(),
      listaEmpregos
    });
  } else {
    res.status(200).render("all-jobs", {
      listaEmpregos
    });
  }
});

router.get('/emprego/:id', async (req, res) => {
  await getUsuarioLogado(req);
  const empregoId = req.params.id;

  try {
    const emprego = await EmpregoDAO.getById(empregoId);

    if (!emprego) {
      return res.status(404).render("error", { message: "Emprego não encontrada" });
    }

    if (usuarioLogado) {
      res.status(200).render("jobs", {
        usuarioLogado: usuarioLogado.get(),
        emprego
      });
    } else {
      res.status(200).render("jobs", {
        emprego
      });
    }
  } catch (error) {
    console.error('Erro ao buscar emprego:', error);
    res.status(500).render("error", { message: "Erro ao carregar a emprego" });
  }
});

router.get('/parceiros', async (req, res) => {
  await getUsuarioLogado(req);
  let listaParceiros = await ParceiroDAO.getAll();

  if (usuarioLogado) {
    res.status(200).render("all-partners", {
      usuarioLogado: usuarioLogado.get(),
      listaParceiros
    })
  } else {
    res.status(200).render("all-partners", {
      listaParceiros
    })
  }
});

router.get('/noticias', async (req, res) => {
  await getUsuarioLogado(req);
  let listaNoticias = await NoticiaDAO.getAll();

  if (usuarioLogado) {
    res.status(200).render("all-news", {
      usuarioLogado: usuarioLogado.get(),
      listaNoticias
    });
  } else {
    res.status(200).render("all-news", {
      listaNoticias
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

    const noticiaFormatada = {
      ...noticia,
      data_criacao: noticia.data_criacao ? formatarData(noticia.data_criacao) : 'Data não disponível',
      createdAt: noticia.createdAt ? formatarData(noticia.createdAt) : 'Data não disponível',
      updatedAt: noticia.updatedAt ? formatarData(noticia.updatedAt) : 'Data não disponível'
    };

    if (usuarioLogado) {
      res.status(200).render("news", {
        usuarioLogado: usuarioLogado.get(),
        noticia: noticiaFormatada
      });
    } else {
      res.status(200).render("news", {
        noticia: noticiaFormatada
      });
    }
  } catch (error) {
    console.error('Erro ao buscar notícia:', error);
    res.status(500).render("error", { message: "Erro ao carregar a notícia" });
  }
});

router.get('/register', async (req, res) => {
  await getUsuarioLogado(req);

  if (!usuarioLogado) {
    res.status(200).render("register")
  } else { 
    res.redirect('/') 
  }
});

router.post('/register', RegisterController.register);
router.post('/login', LoginController.login);

// Postar notícia
router.post('/noticias/create', upload.single('image'), async (req, res) => {
  await getUsuarioLogado(req);

  if (usuarioLogado) {
    const { title, description, content, category } = req.body;
    const imagemUrl = req.file ? `/uploads/${req.file.filename}` : null; // URL da imagem

    try {
      const newNoticia = await NoticiaDAO.create({
        idUsuario: usuarioLogado.id,
        categoria: category,
        titulo: title,
        descricao: description,
        conteudo: content,
        imagemUrl: imagemUrl
      });
      res.status(201).redirect("/noticias");
    } catch (error) {
      console.error('Erro ao criar notícia:', error);
      res.status(500).json({ error: 'Erro ao criar postagem' });
    }
  } else {
    res.redirect('/login');
  }
});

// Criar novo parceiro
router.post('/parceiros/create', upload.single('image'), async (req, res) => {
  await getUsuarioLogado(req);

  if (usuarioLogado) {
    const { ptitle, pdescription, pcontent } = req.body;
    const imagemUrl = req.file ? `/uploads/${req.file.filename}` : null; // URL da imagem

    try {
      const newParceiro = await ParceiroDAO.create({
        titulo: ptitle, 
        descricao: pdescription, 
        conteudo: pcontent,
        imagemUrl: imagemUrl
      });
      res.status(201).redirect("/parceiros");
    } catch (error) {
      console.error('Erro ao criar parceiro:', error);
      res.status(500).json({ error: 'erro ao criar parceiro' });
    }
  } else {
    res.redirect('/');
  }
});

// Postar emprego
router.post('/empregos/create', upload.single('image'), async (req, res) => {
  await getUsuarioLogado(req);

  if (usuarioLogado) {
    const { nomeEmpresa, titulo, conteudo, localizacao, tipoEmprego, salario, requisitos, beneficios, contato } = req.body;
    const imagemUrl = req.file ? `/uploads/${req.file.filename}` : null; // URL da imagem

    try {
      const newEmprego = await EmpregoDAO.create({
        idUsuario: usuarioLogado.id, 
        nomeEmpresa: nomeEmpresa,
        titulo: titulo,
        conteudo: conteudo,
        localizacao: localizacao,
        tipoEmprego: tipoEmprego,
        salario: salario,
        requisitos: requisitos,
        beneficios: beneficios,
        contato: contato,
        imagemUrl: imagemUrl
      });
      res.status(201).redirect("/empregos");
    } catch (error) {
      console.error('Erro ao criar emprego:', error);
      res.status(500).json({ error: 'erro ao criar emprego' });
    }
  } else {
    res.redirect('/');
  }
});

// Postar evento
router.post('/eventos/create', upload.single('image'), async (req, res) => {
  await getUsuarioLogado(req);

  if (usuarioLogado) {
    const { nomeEvento, descricao, localizacao, dataInicio, dataFim, tipoEvento, preco, linkInscricao } = req.body;
    const imagemUrl = req.file ? `/uploads/${req.file.filename}` : null; // URL da imagem

    try {
      const newEvento = await EventoDAO.create({
        nomeEvento: nomeEvento,
        descricao: descricao,
        localizacao: localizacao,
        dataInicio: dataInicio,
        dataFim: dataFim,
        tipoEvento: tipoEvento,
        preco: preco,
        imagemUrl: imagemUrl,
        linkInscricao: linkInscricao
      });
      res.status(201).redirect("/eventos");
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      res.status(500).json({ error: 'erro ao criar evento' });
    }
  } else {
    res.redirect('/');
  }
});


router.get('/deslogar', (req, res) => {
  res.clearCookie('tokenJWT');
  return res.redirect(301, '/');
});

module.exports = router;
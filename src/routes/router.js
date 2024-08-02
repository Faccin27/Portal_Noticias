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
const CurtidaDAO = require('../models/dao/CurtidaDAO');
const { formatDate, formatDateWithoutTime, formatarData } = require('../utils/dateUtils');
const upload = require('../config/multer');
const Curtida = require('../models/Curtida');

let usuarioLogado;

async function getUsuarioLogado(req) {
  usuarioLogado = await UsuarioDAO.getById(req.id);
}


const processCurtidas = async (tipo_item, usuarioLogado) => {
  const todasCurtidas = await CurtidaDAO.getAll();
  const curtidas = {};
  const curtido = new Set();
  const usuarioId = usuarioLogado ? usuarioLogado.id : null;

  todasCurtidas.forEach(curtida => {
    if (curtida.tipo_item === tipo_item) {
      if (!curtidas[curtida.item_id]) {
        curtidas[curtida.item_id] = 0;
      }
      curtidas[curtida.item_id]++;
      if (usuarioId && curtida.usuario_id === usuarioId) {
        curtido.add(curtida.item_id);
      }
    }
  });

  return { curtidas, curtido };
};


router.get('/', async (req, res) => {
  await getUsuarioLogado(req)

  let listaEventos = await EventoDAO.getLatest(3);
  let listaEmpregos = await EmpregoDAO.getLatest(3);
  let listaNoticias = await NoticiaDAO.getLatest(6);
  let listaParceiros = await ParceiroDAO.getLatest(3);


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

  const { curtidas, curtido } = await processCurtidas('evento', usuarioLogado);

  listaEventos = listaEventos.map(evento => {
    const dataValues = evento.dataValues || evento;
    return {
      ...dataValues,
      dataInicio: formatDate(dataValues.dataInicio),
      dataFim: formatDate(dataValues.dataFim),
      dataCriacao: formatDate(dataValues.dataCriacao || dataValues.createdAt),
      total_curtidas: curtidas[dataValues.id] || 0,
      curtido: curtido.has(dataValues.id)
    };
  });

  res.status(200).render("all-events", {
    usuarioLogado: usuarioLogado ? usuarioLogado.get() : null,
    listaEventos
  });
});

router.post('/eventos/curtida/:id', async (req, res) => {
  await getUsuarioLogado(req);

  if (usuarioLogado) {
    let idEvento = req.params.id;

    let curtida = await Curtida.findOne({
      where: {
        tipo_item: 'evento',
        item_id: idEvento,
        usuario_id: usuarioLogado.id
      }
    });

    if (curtida) {
      CurtidaDAO.delete(curtida.id);
    } else {
      CurtidaDAO.create({
        usuario_id: usuarioLogado.id,
        item_id: idEvento,
        tipo_item: 'evento'
      });
    }

    res.redirect(req.get('Referer') || '/');
  } else {
    res.redirect('/login')
  }
})

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

  const { curtidas, curtido } = await processCurtidas('emprego', usuarioLogado);

  listaEmpregos = listaEmpregos.map(emprego => ({
    ...emprego.dataValues,
    data_criacao: formatDateWithoutTime(emprego.dataValues.data_criacao),
    total_curtidas: curtidas[emprego.dataValues.id] || 0,
    curtido: curtido.has(emprego.dataValues.id)
  }));

  res.status(200).render("all-jobs", {
    usuarioLogado: usuarioLogado ? usuarioLogado.get() : null,
    listaEmpregos
  });
});



router.post('/empregos/curtida/:id', async (req, res) => {
  await getUsuarioLogado(req);

  if (usuarioLogado) {
    let idEmprego = req.params.id;

    let curtida = await Curtida.findOne({
      where: {
        tipo_item: 'emprego',
        item_id: idEmprego,
        usuario_id: usuarioLogado.id
      }
    });

    if (curtida) {
      CurtidaDAO.delete(curtida.id);
    } else {
      CurtidaDAO.create({
        usuario_id: usuarioLogado.id,
        item_id: idEmprego,
        tipo_item: 'emprego'
      });
    }

    res.redirect(req.get('Referer') || '/');
  } else {
    res.redirect('/login')
  }
})

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

  const { curtidas, curtido } = await processCurtidas('parceiro', usuarioLogado);

  listaParceiros = listaParceiros.map(parceiro => {
    const dataValues = parceiro.dataValues || parceiro;
    return {
      ...dataValues,
      data_criacao: formatDateWithoutTime(dataValues.data_criacao || dataValues.createdAt),
      total_curtidas: curtidas[dataValues.id] || 0,
      curtido: curtido.has(dataValues.id)
    };
  });

  res.status(200).render("all-partners", {
    usuarioLogado: usuarioLogado ? usuarioLogado.get() : null,
    listaParceiros
  });
});

router.post('/parceiros/curtida/:id', async (req, res) => {
  await getUsuarioLogado(req);

  if (usuarioLogado) {
    let idParceiro = req.params.id;

    let curtida = await Curtida.findOne({
      where: {
        tipo_item: 'parceiro',
        item_id: idParceiro,
        usuario_id: usuarioLogado.id
      }
    });

    if (curtida) {
      CurtidaDAO.delete(curtida.id);
    } else {
      CurtidaDAO.create({
        usuario_id: usuarioLogado.id,
        item_id: idParceiro,
        tipo_item: 'parceiro'
      });
    }

    res.redirect(req.get('Referer') || '/');
  } else {
    res.redirect('/login')
  }
})


router.get('/noticias', async (req, res) => {
  await getUsuarioLogado(req);
  let listaNoticias = await NoticiaDAO.getAll();

  // Log para verificar a estrutura dos dados
  console.log(listaNoticias);

  const { curtidas, curtido } = await processCurtidas('noticia', usuarioLogado);

  listaNoticias = listaNoticias.map(noticia => {
    const dataValues = noticia.dataValues || noticia;
    return {
      ...dataValues,
      data_criacao: formatDateWithoutTime(dataValues.data_criacao || dataValues.createdAt),
      total_curtidas: curtidas[dataValues.id] || 0,
      curtido: curtido.has(dataValues.id)
    };
  });

  res.status(200).render("all-news", {
    usuarioLogado: usuarioLogado ? usuarioLogado.get() : null,
    listaNoticias
  });
});


router.delete('/noticias/:id', async (req, res) => {
  await getUsuarioLogado(req);
  if (usuarioLogado.role == 'admin') {
    const noticiaId = req.params.id;

    try {
      const result = await NoticiaDAO.delete(noticiaId);
      if (result.sucess) {
        res.status(200).json({ message: result.message })
      } else {
        res.status(404).json({ message: result.message })
      }
    } catch (error) {
      res.status(500).json({ error: 'erro ao deletar noticia' })
    }
  } else {
    res.status(403).json({ error: 'Usuario não autenticado' })
  }
});

router.delete('/eventos/:id', async (req, res) => {
  await getUsuarioLogado(req);
  if (usuarioLogado.role == 'admin') {
    const eventoId = req.params.id;

    try {
      const result = await EventoDAO.delete(eventoId);
      if (result.sucess) {
        res.status(200).json({ message: result.message })
      } else {
        res.status(404).json({ message: result.message })
      }
    } catch (error) {
      res.status(500).json({ error: 'erro ao deletar evento' })
    }
  } else {
    res.status(403).json({ error: 'Usuario não autenticado' })
  }
});

router.delete('/empregos/:id', async (req, res) => {
  await getUsuarioLogado(req);
  if (usuarioLogado.role == 'admin') {
    const empregoId = req.params.id;

    try {
      const result = await EmpregoDAO.delete(empregoId);
      if (result.sucess) {
        res.status(200).json({ message: result.message })
      } else {
        res.status(404).json({ message: result.message })
      }
    } catch (error) {
      res.status(500).json({ error: 'erro ao deletar emprego' })
    }
  } else {
    res.status(403).json({ error: 'Usuario não autenticado' })
  }
});

router.delete('/parceiros/:id', async (req, res) => {
  await getUsuarioLogado(req);
  if (usuarioLogado.role == 'admin') {
    const parceiroId = req.params.id;

    try {
      const result = await ParceiroDAO.delete(parceiroId);
      if (result.sucess) {
        res.status(200).json({ message: result.message })
      } else {
        res.status(404).json({ message: result.message })
      }
    } catch (error) {
      res.status(500).json({ error: 'erro ao deletar parceiro' })
    }
  } else {
    res.status(403).json({ error: 'Usuario não autenticado' })
  }
});

router.post('/noticias/curtida/:id', async (req, res) => {
  await getUsuarioLogado(req);

  if (usuarioLogado) {
    let idNoticia = req.params.id;

    let curtida = await Curtida.findOne({
      where: {
        tipo_item: 'noticia',
        item_id: idNoticia,
        usuario_id: usuarioLogado.id
      }
    });

    if (curtida) {
      CurtidaDAO.delete(curtida.id);
    } else {
      CurtidaDAO.create({
        usuario_id: usuarioLogado.id,
        item_id: idNoticia,
        tipo_item: 'noticia'
      });
    }

    res.redirect(req.get('Referer') || '/');
  } else {
    res.redirect('/login')
  }
})


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

router.post('/upload-image', upload.single('upload'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: {
        message: "Não foi possível fazer o upload da imagem."
      }
    });
  }

  // Construa a URL da imagem
  const imageUrl = `/uploads/${req.file.filename}`;

  res.json({
    url: imageUrl
  });
});

// Rota para criar notícia
router.post('/noticias/create', upload.single('image'), async (req, res) => {
  await getUsuarioLogado(req);

  if (usuarioLogado.role == 'admin') {
    const { title, description, content, category } = req.body;
    const imagemUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      const newNoticia = await NoticiaDAO.create({
        idUsuario: usuarioLogado.id,
        categoria: category,
        titulo: title,
        descricao: description,
        conteudo: content, // O CKEditor 5 já envia o conteúdo processado
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

  if (usuarioLogado.role == 'admin') {
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

  if (usuarioLogado.role == 'admin') {
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

  if (usuarioLogado.role == 'admin') {
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


router.get('/profile', async (req, res) => {
  await getUsuarioLogado(req);
  if (usuarioLogado) {
    res.render('profile', { usuarioLogado: usuarioLogado.get() });
  } else {
    res.status(403).send("Acesso negado!")
  }
});

router.get('/criar-noticia', async (req, res) => {
  await getUsuarioLogado(req)

  if (usuarioLogado.role == 'admin') {
    res.render('create-news', { usuarioLogado: usuarioLogado.get() });
  } else { res.redirect('/login') }
})

router.get('/contato', async (req, res) => {
  await getUsuarioLogado(req)

  if (usuarioLogado) {
    res.render('contact', { usuarioLogado: usuarioLogado.get() });
  } else {
    res.render('contact')
  }
})


router.get('/deslogar', (req, res) => {
  res.clearCookie('tokenJWT');
  return res.redirect(301, '/');
});

module.exports = router;
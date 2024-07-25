const db = require('./config/database');
const UsuarioDAO = require('./models/dao/UsuarioDAO');
const NoticiaDAO = require('./models/dao/NoticiaDAO');

// Sincronize os modelos com o banco de dados
db.sequelize.sync({ force: true }).then(async () => {

  console.log('Inserindo dados de exemplo.');

  // Adicionando os usuários
  await UsuarioDAO.create({
    nome: 'Matthew Hettinger',
    email: 'matthewh@example.com',
    senha: 'senha123',
  });
  await UsuarioDAO.create({
    nome: 'Kristin Sykes',
    email: 'kristins@example.com',
    senha: 'senha123',
  });
  await UsuarioDAO.create({
    nome: 'Clement Merrifield',
    email: 'clementm@example.com',
    senha: 'senha123',
  });
  await UsuarioDAO.create({
    nome: 'Tommy Blackburn',
    email: 'tommyb@example.com',
    senha: 'senha123',
  });
  await UsuarioDAO.create({
    nome: 'Agnes Walker',
    email: 'agnesw@example.com',
    senha: 'senha123',
  });
  await UsuarioDAO.create({
    nome: 'Alice Johnson',
    email: 'alicej@example.com',
    senha: 'senha123',
  });
  await UsuarioDAO.create({
    nome: 'Bob Smith',
    email: 'bobsmith@example.com',
    senha: 'senha123',
  });
  await UsuarioDAO.create({
    nome: 'Carol Tyson',
    email: 'carolt@example.com',
    senha: 'senha123',
  });
  await UsuarioDAO.create({
    nome: 'David Lee',
    email: 'davidl@example.com',
    senha: 'senha123',
  });
  await UsuarioDAO.create({
    nome: 'Eva Gordon',
    email: 'evag@example.com',
    senha: 'senha123',
  });
  await UsuarioDAO.create({
    nome: 'Frank Moore',
    email: 'frankm@example.com',
    senha: 'senha123',
  });
  await UsuarioDAO.create({
    nome: 'Grace Hall',
    email: 'graceh@example.com',
    senha: 'senha123',
  });
  await UsuarioDAO.create({
    nome: 'Henry Ward',
    email: 'henryw@example.com',
    senha: 'senha123',
  });
  await UsuarioDAO.create({
    nome: 'Ivy White',
    email: 'ivyw@example.com',
    senha: 'senha123',
  });
  await UsuarioDAO.create({
    nome: 'Jack Norman',
    email: 'jackn@example.com',
    senha: 'senha123',
  });

  // Adicionando as notícias
  await NoticiaDAO.create({
    idUsuario: 0,
    categoria: 'Esportes',
    titulo: 'Final do Campeonato de Futebol',
    descricao: 'O emocionante jogo final do campeonato.',
    conteudo: 'Detalhes completos sobre o jogo final do campeonato de futebol.'
  });

  await NoticiaDAO.create({
    idUsuario: 1,
    categoria: 'Tecnologia',
    titulo: 'Lançamento do Novo Smartphone',
    descricao: 'Tudo sobre o novo smartphone lançado recentemente.',
    conteudo: 'Especificações, preço e data de lançamento do novo smartphone.'
  });

  await NoticiaDAO.create({
    idUsuario: 2,
    categoria: 'Política',
    titulo: 'Eleição Presidencial 2024',
    descricao: 'Cobertura completa das eleições presidenciais de 2024.',
    conteudo: 'Análise dos candidatos e resultados das eleições presidenciais de 2024.'
  });

  await NoticiaDAO.create({
    idUsuario: 3,
    categoria: 'Entretenimento',
    titulo: 'Novo Filme de Ação',
    descricao: 'Crítica e detalhes do novo filme de ação.',
    conteudo: 'Resumo do enredo, elenco e crítica do novo filme de ação.'
  });

  await NoticiaDAO.create({
    idUsuario: 4,
    categoria: 'Ciência',
    titulo: 'Descoberta Científica',
    descricao: 'Nova descoberta científica que pode mudar o mundo.',
    conteudo: 'Detalhes sobre a nova descoberta científica e suas implicações.'
  });

  console.log('Dados de exemplo criados com sucesso.');
  process.exit(0);
});

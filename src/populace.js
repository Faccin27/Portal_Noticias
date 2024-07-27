const db = require('./config/database');
const UsuarioDAO = require('./models/dao/UsuarioDAO');
const NoticiaDAO = require('./models/dao/NoticiaDAO');
const ParceiroDAO = require('./models/dao/ParceiroDAO');
const EmpregoDAO = require('./models/dao/EmpregoDAO');

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
    idUsuario: 2,
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


    // Adicionando os parceiros
    await ParceiroDAO.create({
      titulo: 'Tech Innovators Inc.',
      descricao: 'Líder em inovação tecnológica e desenvolvimento de software.',
      conteudo: 'A Tech Innovators Inc. é uma empresa globalmente reconhecida por suas soluções tecnológicas avançadas e serviços de desenvolvimento de software personalizados.',
      data_criacao: new Date()
    });
  
    await ParceiroDAO.create({
      titulo: 'Green Earth Ltd.',
      descricao: 'Companhia dedicada à sustentabilidade e soluções ecológicas.',
      conteudo: 'A Green Earth Ltd. se destaca por seu compromisso com a preservação ambiental e oferece uma variedade de produtos e serviços eco-friendly.',
      data_criacao: new Date()
    });
  
    await ParceiroDAO.create({
      titulo: 'Health First Co.',
      descricao: 'Empresa focada em produtos e serviços para a saúde e bem-estar.',
      conteudo: 'A Health First Co. fornece uma ampla gama de produtos e serviços voltados para a melhoria da saúde e qualidade de vida de seus clientes.',
      data_criacao: new Date()
    });
  
    await ParceiroDAO.create({
      titulo: 'EduTech Solutions',
      descricao: 'Especialista em tecnologia educacional e ferramentas de aprendizado.',
      conteudo: 'A EduTech Solutions desenvolve soluções inovadoras para melhorar a educação e o processo de aprendizagem através da tecnologia.',
      data_criacao: new Date()
    });
  
    await ParceiroDAO.create({
      titulo: 'Financial Masters',
      descricao: 'Consultoria financeira e serviços de gestão de investimentos.',
      conteudo: 'A Financial Masters oferece consultoria financeira especializada e serviços personalizados para ajudar seus clientes a alcançar seus objetivos financeiros.',
      data_criacao: new Date()
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


    // Adicionando os parceiros
    await ParceiroDAO.create({
      titulo: 'Tech Innovators Inc.',
      descricao: 'Líder em inovação tecnológica e desenvolvimento de software.',
      conteudo: 'A Tech Innovators Inc. é uma empresa globalmente reconhecida por suas soluções tecnológicas avançadas e serviços de desenvolvimento de software personalizados.',
      data_criacao: new Date()
    });
  
    await ParceiroDAO.create({
      titulo: 'Green Earth Ltd.',
      descricao: 'Companhia dedicada à sustentabilidade e soluções ecológicas.',
      conteudo: 'A Green Earth Ltd. se destaca por seu compromisso com a preservação ambiental e oferece uma variedade de produtos e serviços eco-friendly.',
      data_criacao: new Date()
    });
  
    await ParceiroDAO.create({
      titulo: 'Health First Co.',
      descricao: 'Empresa focada em produtos e serviços para a saúde e bem-estar.',
      conteudo: 'A Health First Co. fornece uma ampla gama de produtos e serviços voltados para a melhoria da saúde e qualidade de vida de seus clientes.',
      data_criacao: new Date()
    });
  
    await ParceiroDAO.create({
      titulo: 'EduTech Solutions',
      descricao: 'Especialista em tecnologia educacional e ferramentas de aprendizado.',
      conteudo: 'A EduTech Solutions desenvolve soluções inovadoras para melhorar a educação e o processo de aprendizagem através da tecnologia.',
      data_criacao: new Date()
    });
  
    await ParceiroDAO.create({
      titulo: 'Financial Masters',
      descricao: 'Consultoria financeira e serviços de gestão de investimentos.',
      conteudo: 'A Financial Masters oferece consultoria financeira especializada e serviços personalizados para ajudar seus clientes a alcançar seus objetivos financeiros.',
      data_criacao: new Date()
    });

    await EmpregoDAO.create({
      idUsuario: 1,
      nomeEmpresa: 'Tech Innovators Inc.',
      titulo: 'Desenvolvedor Full Stack',
      conteudo: 'Desenvolvimento de aplicações web e mobile.',
      localizacao: 'São Paulo, SP',
      tipoEmprego: 'Tempo Integral',
      salario: 8000,
      requisitos: 'Experiência com Node.js, React, e banco de dados SQL.',
      beneficios: 'Plano de saúde, vale refeição, e bônus por desempenho.',
      contato: 'hr@techinnovators.com'
    });



  console.log('Dados de exemplo criados com sucesso.');
  process.exit(0);
});

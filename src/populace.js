const Usuario = require('./models/Usuario');
const Noticia = require('./models/Noticia');
const Parceiro = require('./models/Parceiro');
const Emprego = require('./models/Emprego');
const Evento = require('./models/Evento');

// Sincronize os modelos com o banco de dados
async function syncModels() {
  await Usuario.sync({ force: true });
  await Noticia.sync({ force: true });
  await Parceiro.sync({ force: true });
  await Emprego.sync({ force: true });
  await Evento.sync({ force: true });
}

// Função para popular o banco de dados com dados de exemplo
async function populate() {
  // Dados de exemplo para usuários
  const usuarios = await Usuario.bulkCreate([
    { nome: 'João Silva', email: 'joao.silva@example.com', senha: 'senha123' },
    { nome: 'Maria Santos', email: 'maria.santos@example.com', senha: 'senha456' },
    { nome: 'Pedro Oliveira', email: 'pedro.oliveira@example.com', senha: 'senha789' },
    { nome: 'Ana Rodrigues', email: 'ana.rodrigues@example.com', senha: 'senha101' },
    { nome: 'Carlos Ferreira', email: 'carlos.ferreira@example.com', senha: 'senha202' },
    { nome: 'Lucia Costa', email: 'lucia.costa@example.com', senha: 'senha303' },
    { nome: 'Fernando Almeida', email: 'fernando.almeida@example.com', senha: 'senha404' },
    { nome: 'Beatriz Martins', email: 'beatriz.martins@example.com', senha: 'senha505' },
    { nome: 'Ricardo Sousa', email: 'ricardo.sousa@example.com', senha: 'senha606' },
    { nome: 'Camila Nunes', email: 'camila.nunes@example.com', senha: 'senha707' },
    { nome: 'Eduardo Pereira', email: 'eduardo.pereira@example.com', senha: 'senha808' },
    { nome: 'Mariana Lima', email: 'mariana.lima@example.com', senha: 'senha909' },
    { nome: 'Gustavo Santos', email: 'gustavo.santos@example.com', senha: 'senha1010' },
    { nome: 'Isabela Fernandes', email: 'isabela.fernandes@example.com', senha: 'senha1111' },
    { nome: 'Roberto Carvalho', email: 'roberto.carvalho@example.com', senha: 'senha1212' }
  ]);

  // Dados de exemplo para notícias
  await Noticia.bulkCreate([
    { idUsuario: usuarios[0].id, categoria: 'Tecnologia', titulo: 'Lançamento do novo smartphone XYZ', descricao: 'A empresa ABC lança seu mais recente smartphone com tecnologia inovadora.', conteudo: 'O novo smartphone XYZ da empresa ABC promete revolucionar o mercado com sua câmera de 108MP e bateria de longa duração...', data_criacao: new Date('2024-01-15') },
    { idUsuario: usuarios[1].id, categoria: 'Saúde', titulo: 'Descoberta promissora no tratamento do câncer', descricao: 'Pesquisadores desenvolvem nova terapia para combater células cancerígenas.', conteudo: 'Um grupo de cientistas da Universidade XYZ anunciou hoje uma descoberta que pode mudar o rumo do tratamento contra o câncer...', data_criacao: new Date('2024-02-03') },
    { idUsuario: usuarios[2].id, categoria: 'Educação', titulo: 'Novo método de ensino ganha popularidade', descricao: 'Escolas adotam abordagem inovadora para melhorar o aprendizado dos alunos.', conteudo: 'O método de ensino "Aprender Fazendo" está sendo implementado em diversas escolas do país, com resultados surpreendentes...', data_criacao: new Date('2024-02-20') },
    { idUsuario: usuarios[3].id, categoria: 'Economia', titulo: 'Bolsa de valores atinge novo recorde', descricao: 'Índice principal da bolsa supera marca histórica impulsionado por resultados positivos.', conteudo: 'O principal índice da bolsa de valores atingiu hoje um novo recorde, refletindo o otimismo dos investidores e a recuperação econômica...', data_criacao: new Date('2024-03-05') },
    { idUsuario: usuarios[4].id, categoria: 'Esportes', titulo: 'Brasil se classifica para as Olimpíadas em nova modalidade', descricao: 'Equipe brasileira garante vaga inédita nas Olimpíadas de 2024.', conteudo: 'A seleção brasileira de escalada esportiva conquistou hoje sua classificação para os Jogos Olímpicos de 2024, marcando presença pela primeira vez nesta modalidade...', data_criacao: new Date('2024-03-18') },
    { idUsuario: usuarios[5].id, categoria: 'Tecnologia', titulo: 'Avanço significativo em computação quântica', descricao: 'Cientistas alcançam marco importante no desenvolvimento de computadores quânticos.', conteudo: 'Uma equipe internacional de pesquisadores anunciou hoje ter alcançado um avanço significativo na computação quântica, resolvendo um problema complexo em tempo recorde...', data_criacao: new Date('2024-04-02') },
    { idUsuario: usuarios[6].id, categoria: 'Saúde', titulo: 'Nova vacina contra gripe mostra 98% de eficácia', descricao: 'Resultados de testes clínicos revelam alta eficácia de nova vacina contra múltiplas cepas do vírus da gripe.', conteudo: 'Uma vacina desenvolvida por pesquisadores brasileiros demonstrou eficácia de 98% contra múltiplas cepas do vírus da gripe em testes clínicos de fase 3...', data_criacao: new Date('2024-04-20') },
    { idUsuario: usuarios[7].id, categoria: 'Educação', titulo: 'Programa de intercâmbio virtual ganha destaque', descricao: 'Estudantes participam de intercâmbio cultural sem sair de casa através de plataforma inovadora.', conteudo: 'Um novo programa de intercâmbio virtual está permitindo que estudantes de todo o mundo experimentem diferentes culturas e sistemas educacionais sem a necessidade de viajar...', data_criacao: new Date('2024-05-07') },
    { idUsuario: usuarios[8].id, categoria: 'Economia', titulo: 'Startup brasileira recebe investimento bilionário', descricao: 'Empresa de tecnologia atrai atenção de investidores internacionais com solução inovadora.', conteudo: 'A startup brasileira TechSolutions acaba de anunciar uma rodada de investimentos de 1 bilhão de dólares, liderada por um grupo de investidores do Vale do Silício...', data_criacao: new Date('2024-05-22') },
    { idUsuario: usuarios[9].id, categoria: 'Esportes', titulo: 'Atleta brasileiro quebra recorde mundial', descricao: 'Nadador supera marca histórica nos 100 metros borboleta.', conteudo: 'O nadador brasileiro João da Silva quebrou o recorde mundial dos 100 metros borboleta durante o Campeonato Mundial de Natação, com o tempo de 48,73 segundos...', data_criacao: new Date('2024-06-10') },
    { idUsuario: usuarios[10].id, categoria: 'Tecnologia', titulo: 'Carro voador realiza primeiro voo comercial', descricao: 'Empresa de transporte inicia testes com veículos aéreos urbanos.', conteudo: 'A empresa AeroMob realizou hoje o primeiro voo comercial de seu carro voador na cidade de São Paulo, marcando o início de uma nova era no transporte urbano...', data_criacao: new Date('2024-06-28') },
    { idUsuario: usuarios[11].id, categoria: 'Saúde', titulo: 'Estudo revela benefícios surpreendentes do sono', descricao: 'Pesquisadores descobrem novas funções do sono na saúde cerebral.', conteudo: 'Um estudo conduzido por neurocientistas da Universidade Federal do Rio de Janeiro revelou que o sono desempenha um papel crucial na remoção de toxinas cerebrais...', data_criacao: new Date('2024-07-15') },
    { idUsuario: usuarios[12].id, categoria: 'Educação', titulo: 'Projeto de educação rural recebe prêmio internacional', descricao: 'Iniciativa brasileira é reconhecida por melhorar acesso à educação em áreas remotas.', conteudo: 'O projeto "Educar sem Fronteiras", que leva educação de qualidade a comunidades rurais isoladas, foi premiado pela UNESCO como uma das iniciativas mais inovadoras em educação...', data_criacao: new Date('2024-08-01') },
    { idUsuario: usuarios[13].id, categoria: 'Economia', titulo: 'Nova política econômica impulsiona crescimento', descricao: 'Medidas adotadas pelo governo resultam em aumento significativo do PIB.', conteudo: 'O Ministério da Economia anunciou hoje que o PIB brasileiro cresceu 4,5% no último trimestre, superando as expectativas dos analistas e indicando uma forte recuperação econômica...', data_criacao: new Date('2024-08-20') },
    { idUsuario: usuarios[14].id, categoria: 'Esportes', titulo: 'Brasil sedia Copa do Mundo de eSports', descricao: 'Evento reúne os melhores jogadores do mundo em competição de jogos eletrônicos.', conteudo: 'A cidade de São Paulo será palco da primeira Copa do Mundo de eSports, reunindo equipes de mais de 30 países em um evento que promete atrair milhões de espectadores online...', data_criacao: new Date('2024-09-05') }
  ]);

  // Dados de exemplo para parceiros
  await Parceiro.bulkCreate([
    { titulo: 'TechCorp Soluções', descricao: 'Empresa líder em soluções de TI', conteudo: 'A TechCorp é especializada em fornecer soluções de TI inovadoras para empresas de todos os tamanhos. Com uma equipe de especialistas altamente qualificados, oferecemos serviços de consultoria, desenvolvimento de software e suporte técnico 24/7.', data_criacao: new Date('2024-01-10') },
    { titulo: 'EcoGreen Energia', descricao: 'Fornecedor de energia renovável', conteudo: 'A EcoGreen Energia é pioneira no fornecimento de energia limpa e renovável. Nosso compromisso com a sustentabilidade nos levou a desenvolver tecnologias de ponta em energia solar e eólica, contribuindo para um futuro mais verde.', data_criacao: new Date('2024-01-25') },
    { titulo: 'HealthPlus Seguros', descricao: 'Planos de saúde personalizados', conteudo: 'A HealthPlus oferece planos de saúde adaptados às necessidades individuais de cada cliente. Com uma rede de hospitais e médicos de primeira linha, garantimos o melhor cuidado para você e sua família.', data_criacao: new Date('2024-02-08') },
    { titulo: 'EduTech Inovação', descricao: 'Soluções educacionais tecnológicas', conteudo: 'A EduTech está na vanguarda da revolução educacional, fornecendo plataformas de aprendizado online e ferramentas interativas que transformam a experiência de ensino e aprendizagem.', data_criacao: new Date('2024-02-22') },
    { titulo: 'FinanceWise Consultoria', descricao: 'Consultoria financeira especializada', conteudo: 'A FinanceWise oferece consultoria financeira de alto nível para indivíduos e empresas. Nossa equipe de especialistas utiliza análises avançadas para otimizar investimentos e estratégias financeiras.', data_criacao: new Date('2024-03-10') },
    { titulo: 'FitLife Academia', descricao: 'Rede de academias de última geração', conteudo: 'A FitLife é mais do que uma academia - é um estilo de vida. Com equipamentos de ponta, aulas inovadoras e personal trainers altamente qualificados, ajudamos você a alcançar seus objetivos de saúde e fitness.', data_criacao: new Date('2024-03-25') },
    { titulo: 'GreenBuild Construtora', descricao: 'Construção sustentável e eficiente', conteudo: 'A GreenBuild é líder em construções sustentáveis, utilizando materiais ecológicos e técnicas inovadoras para criar edifícios eficientes e ambientalmente responsáveis.', data_criacao: new Date('2024-04-08') },
  ]);

  // Dados de exemplo para empregos
  await Emprego.bulkCreate([
    { idUsuario: usuarios[0].id, nomeEmpresa: 'TechCorp Soluções', titulo: 'Desenvolvedor Full Stack Senior', conteudo: 'Buscamos um desenvolvedor full stack experiente para liderar projetos de desenvolvimento web. O candidato ideal terá sólidos conhecimentos em React, Node.js e bancos de dados SQL/NoSQL.', localizacao: 'São Paulo', tipoEmprego: 'Tempo Integral', salario: 15000, requisitos: 'Mínimo de 5 anos de experiência em desenvolvimento web, formação em Ciência da Computação ou área relacionada.', beneficios: 'Plano de saúde, vale-refeição, ambiente de trabalho flexível, oportunidades de crescimento.', contato: 'rh@techcorp.com', data_criacao: new Date('2024-01-15') },
    { idUsuario: usuarios[1].id, nomeEmpresa: 'EcoGreen Energia', titulo: 'Engenheiro de Energia Renovável', conteudo: 'Procuramos um engenheiro especializado em energia renovável para desenvolver e implementar projetos de energia solar e eólica.', localizacao: 'Rio de Janeiro', tipoEmprego: 'Tempo Integral', salario: 12000, requisitos: 'Graduação em Engenharia Elétrica ou Ambiental, experiência em projetos de energia renovável.', beneficios: 'Seguro de vida, plano de previdência privada, bônus anual.', contato: 'careers@ecogreen.com', data_criacao: new Date('2024-02-01') },
    { idUsuario: usuarios[2].id, nomeEmpresa: 'HealthPlus Seguros', titulo: 'Analista de Dados de Saúde', conteudo: 'Estamos em busca de um analista de dados para trabalhar com big data na área de saúde, ajudando a otimizar nossos planos e serviços.', localizacao: 'Belo Horizonte', tipoEmprego: 'Tempo Integral', salario: 8000, requisitos: 'Formação em Estatística ou Ciência de Dados, conhecimento em R e Python.', beneficios: 'Plano de saúde premium, horário flexível, programas de treinamento.', contato: 'jobs@healthplus.com', data_criacao: new Date('2024-02-15') },
    { idUsuario: usuarios[3].id, nomeEmpresa: 'EduTech Inovação', titulo: 'Designer Instrucional', conteudo: 'Procuramos um designer instrucional criativo para desenvolver cursos online interativos e envolventes.', localizacao: 'Curitiba', tipoEmprego: 'Tempo Integral', salario: 7000, requisitos: 'Experiência em design instrucional, conhecimento de ferramentas de autoria de e-learning.', beneficios: 'Plano de desenvolvimento de carreira, subsídio para cursos e certificações.', contato: 'talent@edutech.com', data_criacao: new Date('2024-03-01') },
    { idUsuario: usuarios[4].id, nomeEmpresa: 'FinanceWise Consultoria', titulo: 'Consultor Financeiro Senior', conteudo: 'Buscamos um consultor financeiro experiente para assessorar clientes de alto patrimônio em estratégias de investimento.', localizacao: 'São Paulo', tipoEmprego: 'Tempo Integral', salario: 20000, requisitos: 'CFA ou CFP, mínimo de 8 anos de experiência em consultoria financeira.', beneficios: 'Bônus por desempenho, plano de previdência privada, seguro de vida.', contato: 'recruiting@financewise.com', data_criacao: new Date('2024-03-15') },
    { idUsuario: usuarios[5].id, nomeEmpresa: 'FitLife Academia', titulo: 'Personal Trainer', conteudo: 'Procuramos personal trainers motivados e certificados para se juntar à nossa equipe de elite.', localizacao: 'Rio de Janeiro', tipoEmprego: 'Meio Período', salario: 5000, requisitos: 'Certificação em Personal Training, experiência mínima de 2 anos.', beneficios: 'Acesso gratuito à academia, comissões por cliente, oportunidades de desenvolvimento profissional.', contato: 'hr@fitlife.com', data_criacao: new Date('2024-04-01') },
    { idUsuario: usuarios[6].id, nomeEmpresa: 'GreenBuild Construtora', titulo: 'Arquiteto Sustentável', conteudo: 'Estamos contratando um arquiteto especializado em projetos sustentáveis e eficientes energeticamente.', localizacao: 'Brasília', tipoEmprego: 'Tempo Integral', salario: 10000, requisitos: 'Formação em Arquitetura, especialização em construções sustentáveis, conhecimento em certificações LEED.', beneficios: 'Participação nos lucros, plano de saúde extensivo à família.', contato: 'vagas@greenbuild.com', data_criacao: new Date('2024-04-15') },
    { idUsuario: usuarios[7].id, nomeEmpresa: 'TravelJoy Turismo', titulo: 'Especialista em Viagens de Luxo', conteudo: 'Procuramos um especialista em viagens para criar experiências únicas e luxuosas para nossos clientes VIP.', localizacao: 'Salvador', tipoEmprego: 'Tempo Integral', salario: 7500, requisitos: 'Experiência em agência de viagens de luxo, fluência em inglês e espanhol.', beneficios: 'Viagens de familiarização, comissões atrativas, plano de carreira.', contato: 'careers@traveljoy.com', data_criacao: new Date('2024-05-01') },
    { idUsuario: usuarios[8].id, nomeEmpresa: 'ArtisanCraft Móveis', titulo: 'Mestre Marceneiro', conteudo: 'Buscamos um mestre marceneiro experiente para liderar nossa equipe de produção de móveis artesanais de luxo.', localizacao: 'São Paulo', tipoEmprego: 'Tempo Integral', salario: 9000, requisitos: 'Mínimo de 10 anos de experiência em marcenaria fina, portfólio de trabalhos realizados.', beneficios: 'Participação nos lucros, seguro de saúde, ambiente de trabalho inspirador.', contato: 'talentos@artisancraft.com', data_criacao: new Date('2024-05-15') },
    { idUsuario: usuarios[9].id, nomeEmpresa: 'PetLove Clínica Veterinária', titulo: 'Médico Veterinário', conteudo: 'Estamos contratando um médico veterinário compassivo e experiente para se juntar à nossa equipe clínica.', localizacao: 'Porto Alegre', tipoEmprego: 'Tempo Integral', salario: 8500, requisitos: 'Graduação em Medicina Veterinária, CRMV ativo, experiência mínima de 3 anos.', beneficios: 'Plano de saúde para você e seu pet, educação continuada, ambiente de trabalho colaborativo.', contato: 'oportunidades@petlove.com', data_criacao: new Date('2024-06-01') },
    { idUsuario: usuarios[10].id, nomeEmpresa: 'CyberShield Segurança', titulo: 'Analista de Segurança Cibernética', conteudo: 'Procuramos um analista de segurança cibernética para proteger nossos sistemas e clientes contra ameaças digitais.', localizacao: 'Recife', tipoEmprego: 'Tempo Integral', salario: 9500, requisitos: 'Formação em Segurança da Informação ou área relacionada, certificações relevantes (CISSP, CEH).', beneficios: 'Home office flexível, plano de saúde, subsídio para certificações.', contato: 'security-jobs@cybershield.com', data_criacao: new Date('2024-06-15') }
  ]);

  await Evento.bulkCreate([
    {
      nomeEvento: 'Workshop de Desenvolvimento Web',
      descricao: 'Um workshop intensivo de desenvolvimento web cobrindo HTML, CSS, JavaScript e frameworks modernos.',
      localizacao: 'Auditório Principal',
      dataInicio: new Date('2024-08-15T09:00:00'),
      dataFim: new Date('2024-08-15T17:00:00'),
      tipoEvento: 'Workshop',
      preco: 100.00,
      imagem: 'https://t3.ftcdn.net/jpg/05/31/71/02/360_F_531710260_ByieqNe7Ut6QBHgIR7xgdsxH7gICrHr1.jpg',
      linkInscricao: 'https://t3.ftcdn.net/jpg/05/31/71/02/360_F_531710260_ByieqNe7Ut6QBHgIR7xgdsxH7gICrHr1.jpg'
    },
    {
      nomeEvento: 'Seminário de Inteligência Artificial',
      descricao: 'Discussões sobre os avanços mais recentes em IA e como aplicar técnicas de aprendizado de máquina em problemas do mundo real.',
      localizacao: 'Centro de Convenções',
      dataInicio: new Date('2024-09-10T10:00:00'),
      dataFim: new Date('2024-09-10T16:00:00'),
      tipoEvento: 'Seminário',
      preco: 150.00,
      imagem: 'https://t3.ftcdn.net/jpg/05/31/71/02/360_F_531710260_ByieqNe7Ut6QBHgIR7xgdsxH7gICrHr1.jpg',
      linkInscricao: 'https://t3.ftcdn.net/jpg/05/31/71/02/360_F_531710260_ByieqNe7Ut6QBHgIR7xgdsxH7gICrHr1.jpg'
    },
    {
      nomeEvento: 'Conferência de Segurança Cibernética',
      descricao: 'Conferência anual sobre as últimas tendências e ameaças em segurança cibernética.',
      localizacao: 'Sala de Conferências 3',
      dataInicio: new Date('2024-10-05T14:00:00'),
      dataFim: new Date('2024-10-05T18:00:00'),
      tipoEvento: 'Conferência',
      preco: 200.00,
      imagem: 'https://t3.ftcdn.net/jpg/05/31/71/02/360_F_531710260_ByieqNe7Ut6QBHgIR7xgdsxH7gICrHr1.jpg',
      linkInscricao: 'https://t3.ftcdn.net/jpg/05/31/71/02/360_F_531710260_ByieqNe7Ut6QBHgIR7xgdsxH7gICrHr1.jpg'
    },
    {
      nomeEvento: 'Hackathon de Inovação',
      descricao: 'Um evento de hackathon focado em criar soluções inovadoras para problemas reais, com prêmios e mentorias.',
      localizacao: 'Centro de Inovação',
      dataInicio: new Date('2024-11-12T08:00:00'),
      dataFim: new Date('2024-11-12T20:00:00'),
      tipoEvento: 'Hackathon',
      preco: 75.00,
      imagem: 'https://t3.ftcdn.net/jpg/05/31/71/02/360_F_531710260_ByieqNe7Ut6QBHgIR7xgdsxH7gICrHr1.jpg',
      linkInscricao: 'https://t3.ftcdn.net/jpg/05/31/71/02/360_F_531710260_ByieqNe7Ut6QBHgIR7xgdsxH7gICrHr1.jpg'
    },
    {
      nomeEvento: 'Fórum de Desenvolvimento Sustentável',
      descricao: 'Discussões e workshops sobre práticas sustentáveis no desenvolvimento de projetos e tecnologias.',
      localizacao: 'Auditório Verde',
      dataInicio: new Date('2024-11-25T09:00:00'),
      dataFim: new Date('2024-11-25T15:00:00'),
      tipoEvento: 'Fórum',
      preco: 120.00,
      imagem: 'https://t3.ftcdn.net/jpg/05/31/71/02/360_F_531710260_ByieqNe7Ut6QBHgIR7xgdsxH7gICrHr1.jpg',
      linkInscricao: 'https://t3.ftcdn.net/jpg/05/31/71/02/360_F_531710260_ByieqNe7Ut6QBHgIR7xgdsxH7gICrHr1.jpg'
    },
    {
      nomeEvento: 'Mesa Redonda sobre Transformação Digital',
      descricao: 'Evento com especialistas discutindo as tendências e desafios da transformação digital nas empresas.',
      localizacao: 'Sala de Reuniões 2',
      dataInicio: new Date('2024-12-08T13:00:00'),
      dataFim: new Date('2024-12-08T17:00:00'),
      tipoEvento: 'Mesa Redonda',
      preco: 180.00,
      imagem: 'https://t3.ftcdn.net/jpg/05/31/71/02/360_F_531710260_ByieqNe7Ut6QBHgIR7xgdsxH7gICrHr1.jpg',
      linkInscricao: 'https://t3.ftcdn.net/jpg/05/31/71/02/360_F_531710260_ByieqNe7Ut6QBHgIR7xgdsxH7gICrHr1.jpg'
    }
  ]);
  
  console.log('Dados de exemplo inseridos com sucesso.');
}

// Execute as funções de sincronização e população
syncModels()
  .then(() => populate())
  .catch((error) => console.error('Erro ao sincronizar ou popular o banco de dados:', error));

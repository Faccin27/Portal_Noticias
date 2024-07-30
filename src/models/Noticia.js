// Importando as dependências necessárias
const db = require('../config/database');
const { Model, DataTypes } = require('sequelize');

// Definindo a classe Noticia que estende Model do Sequelize
class Noticia extends Model {
  static associate(models) {
    // Definindo a associação com o modelo Usuario
    this.belongsTo(models.Usuario, { foreignKey: 'idUsuario', as: 'autor' });
  }
}

// Inicializando a classe Noticia com o esquema do banco de dados
Noticia.init({
  // Nome do autor é uma chave estrangeira para a tabela Usuarios
  idUsuario: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'usuarios', // Nome da tabela referenciada
      key: 'id' // Chave primária da tabela referenciada
    }
  },
  // Categoria não pode ser null
  categoria: { type: DataTypes.STRING, allowNull: false },
  // Título não pode ser null
  titulo: { type: DataTypes.STRING, allowNull: false },
  // Descrição não pode ser null
  descricao: { type: DataTypes.TEXT, allowNull: false },
  // Conteúdo não pode ser null
  conteudo: { type: DataTypes.TEXT, allowNull: false },
  // URL da imagem, pode ser null
  imagemUrl: { type: DataTypes.STRING, allowNull: true },
  // Data de criação é preenchida automaticamente com a data e hora atuais
  data_criacao: { 
    type: DataTypes.DATE, 
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
}, {
  sequelize: db.sequelize, // Conexão com o banco de dados
  modelName: 'Noticia', // Nome do modelo
  tableName: 'noticia', // Nome da tabela no banco de dados
});

// Exportando a classe Noticia
module.exports = Noticia;

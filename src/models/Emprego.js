// Importando as dependências necessárias
const db = require('../config/database');
const { Model, DataTypes } = require('sequelize');

// Definindo a classe Emprego que estende Model do Sequelize
class Emprego extends Model {
  static associate(models) {
    // Definindo a associação com o modelo Usuario
    this.belongsTo(models.Usuario, { foreignKey: 'idUsuario', as: 'autor' });
  }
}

// Inicializando a classe Emprego com o esquema do banco de dados
Emprego.init({
  // Nome do autor é uma chave estrangeira para a tabela Usuarios
  idUsuario: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'usuarios', // Nome da tabela referenciada
      key: 'id' // Chave primária da tabela referenciada
    }
  },
  idUsuario: { type: DataTypes.INTEGER, allowNull: false },
  // Nome da empresa não pode ser null
  nomeEmpresa: { type: DataTypes.STRING, allowNull: false },
  // Título do emprego não pode ser null
  titulo: { type: DataTypes.STRING, allowNull: false },
  // Conteúdo do emprego não pode ser null
  conteudo: { type: DataTypes.TEXT, allowNull: false },
  // Localização do emprego não pode ser null
  localizacao: { type: DataTypes.STRING, allowNull: false },
  // Tipo de emprego não pode ser null
  tipoEmprego: { type: DataTypes.STRING, allowNull: false },
  // Salário não pode ser null
  salario: { type: DataTypes.DECIMAL, allowNull: false },
  // Requisitos do emprego não pode ser null
  requisitos: { type: DataTypes.TEXT, allowNull: false },
  // Benefícios do emprego não pode ser null
  beneficios: { type: DataTypes.TEXT, allowNull: false },
  // Contato não pode ser null
  contato: { type: DataTypes.STRING, allowNull: false },
  // Data de criação é preenchida automaticamente com a data e hora atuais
  data_criacao: { 
    type: DataTypes.DATE, 
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
}, {
  sequelize: db.sequelize, // Conexão com o banco de dados
  modelName: 'Emprego', // Nome do modelo
  tableName: 'emprego', // Nome da tabela no banco de dados
});

// Exportando a classe Emprego
module.exports = Emprego;

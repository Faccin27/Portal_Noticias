// Importando as dependências necessárias
const db = require('../config/database');
const { Model, DataTypes } = require('sequelize');

// Definindo a classe Parceiro que estende Model do Sequelize
class Parceiro extends Model {
  // Método para definir associações, caso necessário no futuro
  static associate(models) {
    // Defina as associações aqui, se necessário
  }
}

// Inicializando a classe Parceiro com o esquema do banco de dados
Parceiro.init({
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // URL da imagem, pode ser null
  imagemUrl: { type: DataTypes.STRING, allowNull: true },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
}, {
  sequelize: db.sequelize, 
  modelName: 'Parceiro', 
  tableName: 'parceiros', 
});

// Exportando a classe Parceiro
module.exports = Parceiro;

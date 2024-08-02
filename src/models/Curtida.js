const db = require('../config/database');
const { Model, DataTypes } = require('sequelize');

class Curtida extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  }
}

Curtida.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios', 
      key: 'id'          // Chave primária na tabela de usuários
    }
  },
  tipo_item: {
    type: DataTypes.ENUM('noticia', 'emprego', 'parceiro', 'evento'),
    allowNull: false
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: db.sequelize, 
  modelName: 'Curtida', 
  tableName: 'curtidas', 
});

module.exports = Curtida;

// Importando as dependências necessárias
const db = require('../config/database');
const { Model, DataTypes } = require('sequelize');

class Evento extends Model {
    
}

// Inicializando a classe Evento com o esquema do banco de dados
Evento.init({
    // Nome do evento não pode ser null
    nomeEvento: { type: DataTypes.STRING, allowNull: false },
    // Descrição do evento não pode ser null
    descricao: { type: DataTypes.TEXT, allowNull: false },
    // Localização do evento não pode ser null
    localizacao: { type: DataTypes.STRING, allowNull: false },
    // Data e hora de início do evento não pode ser null
    dataInicio: { type: DataTypes.DATE, allowNull: false },
    // Data e hora de término do evento não pode ser null
    dataFim: { type: DataTypes.DATE, allowNull: false },
    // Tipo de evento não pode ser null
    tipoEvento: { type: DataTypes.STRING, allowNull: false },
    // Preço do ingresso pode ser null
    preco: { type: DataTypes.DECIMAL, allowNull: true },
    // URL da imagem do evento pode ser null
    imagem: { type: DataTypes.STRING, allowNull: true },
    // Link para inscrição ou compra de ingressos pode ser null
    linkInscricao: { type: DataTypes.STRING, allowNull: true },
    // Data de criação é preenchida automaticamente com a data e hora atuais
    dataCriacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    sequelize: db.sequelize, // Conexão com o banco de dados
    modelName: 'Evento', // Nome do modelo
    tableName: 'eventos', // Nome da tabela no banco de dados
});

// Exportando a classe Evento
module.exports = Evento;

const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../../config/database");
const Parceiro = require('../Parceiro');

class ParceiroDAO {
  // Cria e persiste um parceiro
  async create({ idUsuario, categoria, titulo, descricao, conteudo, imagemUrl }) {
    try {
      const newParceiro = await Parceiro.create({ idUsuario, categoria, titulo, descricao, conteudo, imagemUrl });
      return newParceiro;
    } catch (error) {
      console.error('Erro ao criar parceiro:', error);
      throw error; // Rejeitar a promessa em caso de erro
    }
  }

  // Busca todos os parceiros do banco de dados
  async getAll() {
    try {
      const parceiros = await Parceiro.findAll();
      return parceiros;
    } catch (error) {
      console.error('Erro ao buscar parceiros:', error);
      throw error;
    }
  }

  // Busca um parceiro no banco de dados pela sua ID
  async getById(parceiroId) {
    try {
      const parceiro = await Parceiro.findByPk(parceiroId);
      return parceiro;
    } catch (error) {
      console.error('Erro ao buscar parceiro por ID:', error);
      throw error;
    }
  }

  // Atualiza um parceiro no banco de dados
  async update(parceiroId, parceiroAtualizado) {
    try {
      const parceiro = await Parceiro.findByPk(parceiroId);
      if (parceiro) {
        await parceiro.update(parceiroAtualizado);
        return parceiro;
      } else {
        console.log('Parceiro não encontrado para atualização.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao atualizar parceiro:', error);
      throw error;
    }
  }

  // Exclui um parceiro do banco de dados
  async delete(parceiroId) {
    try {
      const parceiro = await Parceiro.findByPk(parceiroId);
      if (parceiro) {
        await parceiro.destroy();
        return true;
      } else {
        console.error('Parceiro não encontrado para exclusão.');
        return false;
      }
    } catch (error) {
      console.error('Erro ao excluir parceiro:', error);
      throw error;
    }
  }

  // Busca um parceiro no banco de dados por qualquer campo especificado na query
  async findOne(query) {
    try {
      const parceiro = await Parceiro.findOne({ where: query });
      return parceiro;
    } catch (error) {
      console.error('Erro ao buscar parceiro:', error);
      throw error;
    }
  }

  // Buscar últimos parceiros inserindo nome do autor
  async getLatest(limit = 3) {
    try {
      const parceiros = await Parceiro.findAll({
        order: [['id', 'DESC']],
        limit: limit
      });
      return parceiros;
    } catch (error) {
      console.error('Erro ao buscar os últimos parceiros:', error);
      throw error;
    }
  }
}

module.exports = new ParceiroDAO();

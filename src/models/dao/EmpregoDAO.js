const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../../config/database");
const Emprego = require('../Emprego');

class EmpregoDAO {
  // Cria e persiste um emprego
  async create({ nomeEmpresa, titulo, conteudo, localizacao, tipoEmprego, salario, requisitos, beneficios, contato }) {
    let newEmprego;
    try {
      newEmprego = await Emprego.create({ nomeEmpresa, titulo, conteudo, localizacao, tipoEmprego, salario, requisitos, beneficios, contato });
    } catch (error) {
      console.error('Erro ao criar emprego:', error);
    } finally {
      return newEmprego; // Retorne o emprego criado
    }
  }

  // Busca todos os empregos
  async getAll() {
    let empregos;
    try {
      empregos = await Emprego.findAll();
    } catch (error) {
      console.error('Erro ao buscar empregos:', error);
    } finally {
      return empregos;
    }
  }

  // Busca um emprego no banco de dados pela sua ID
  async getById(empregoId) {
    let emprego;
    try {
      emprego = await Emprego.findByPk(empregoId);
    } catch (error) {
      console.error('Erro ao buscar emprego por ID:', error);
    } finally {
      return emprego;
    }
  }

  // Atualiza um emprego no banco de dados
  async update(empregoId, empregoAtualizado) {
    let emprego;
    try {
      emprego = await Emprego.findByPk(empregoId);
      if (emprego) {
        emprego.nomeEmpresa = empregoAtualizado.nomeEmpresa || emprego.nomeEmpresa;
        emprego.titulo = empregoAtualizado.titulo || emprego.titulo;
        emprego.conteudo = empregoAtualizado.conteudo || emprego.conteudo;
        emprego.localizacao = empregoAtualizado.localizacao || emprego.localizacao;
        emprego.tipoEmprego = empregoAtualizado.tipoEmprego || emprego.tipoEmprego;
        emprego.salario = empregoAtualizado.salario || emprego.salario;
        emprego.requisitos = empregoAtualizado.requisitos || emprego.requisitos;
        emprego.beneficios = empregoAtualizado.beneficios || emprego.beneficios;
        emprego.contato = empregoAtualizado.contato || emprego.contato;
        await emprego.save();
      } else {
        console.log('Emprego não encontrado para atualização.');
      }
    } catch (error) {
      console.error('Erro ao atualizar emprego:', error);
    } finally {
      return emprego;
    }
  }

  // Exclui um emprego do banco de dados
  async delete(empregoId) {
    let deletado = false;
    try {
      const emprego = await Emprego.findByPk(empregoId);
      if (emprego) {
        await emprego.destroy();
        deletado = true;
      } else {
        console.error('Emprego não encontrado para exclusão.');
      }
    } catch (error) {
      console.error('Erro ao excluir emprego:', error);
    } finally {
      return deletado;
    }
  }

  // Busca um emprego no banco de dados por qualquer campo especificado na query
  async findOne(query) {
    let emprego;
    try {
      emprego = await Emprego.findOne({ where: query });
    } catch (error) {
      console.error('Erro ao buscar emprego:', error);
    } finally {
      return emprego;
    }
  }

  // Busca os últimos empregos inseridos
  async getLatest(limit = 3) {
    let empregos;
    try {
      empregos = await Emprego.findAll({
        order: [['id', 'DESC']],
        limit: limit
      });
    } catch (error) {
      console.error('Erro ao buscar os últimos empregos:', error);
    } finally {
      return empregos;
    }
  }
}

module.exports = new EmpregoDAO();

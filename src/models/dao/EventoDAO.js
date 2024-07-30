const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../../config/database");
const Evento = require('../Evento');

class EventoDAO {
  // Cria e persiste um evento
  async create({ nomeEvento, descricao, localizacao, dataInicio, dataFim, tipoEvento, preco,  linkInscricao, imagemUrl }) {
    let newEvento;
    try {
      newEvento = await Evento.create({ nomeEvento, descricao, localizacao, dataInicio, dataFim, tipoEvento, preco,  linkInscricao, imagemUrl });
    } catch (error) {
      console.error('Erro ao criar evento:', error);
    } finally {
      return newEvento; // Retorne o evento criado
    }
  }

  // Busca todos os eventos
  async getAll() {
    let eventos;
    try {
      eventos = await Evento.findAll();
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    } finally {
      return eventos;
    }
  }

  // Busca um evento no banco de dados pela sua ID
  async getById(eventoId) {
    let evento;
    try {
      evento = await Evento.findByPk(eventoId);
    } catch (error) {
      console.error('Erro ao buscar evento por ID:', error);
    } finally {
      return evento;
    }
  }

  // Atualiza um evento no banco de dados
  async update(eventoId, eventoAtualizado) {
    let evento;
    try {
      evento = await Evento.findByPk(eventoId);
      if (evento) {
        evento.nomeEvento = eventoAtualizado.nomeEvento || evento.nomeEvento;
        evento.descricao = eventoAtualizado.descricao || evento.descricao;
        evento.localizacao = eventoAtualizado.localizacao || evento.localizacao;
        evento.dataInicio = eventoAtualizado.dataInicio || evento.dataInicio;
        evento.dataFim = eventoAtualizado.dataFim || evento.dataFim;
        evento.tipoEvento = eventoAtualizado.tipoEvento || evento.tipoEvento;
        evento.preco = eventoAtualizado.preco || evento.preco;
        evento.imagem = eventoAtualizado.imagem || evento.imagem;
        evento.linkInscricao = eventoAtualizado.linkInscricao || evento.linkInscricao;
        await evento.save();
      } else {
        console.log('Evento não encontrado para atualização.');
      }
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
    } finally {
      return evento;
    }
  }

  // Exclui um evento do banco de dados
  async delete(eventoId) {
    let deletado = false;
    try {
      const evento = await Evento.findByPk(eventoId);
      if (evento) {
        await evento.destroy();
        deletado = true;
      } else {
        console.error('Evento não encontrado para exclusão.');
      }
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    } finally {
      return deletado;
    }
  }

  // Busca um evento no banco de dados por qualquer campo especificado na query
  async findOne(query) {
    let evento;
    try {
      evento = await Evento.findOne({ where: query });
    } catch (error) {
      console.error('Erro ao buscar evento:', error);
    } finally {
      return evento;
    }
  }

  // Busca os últimos eventos inseridos
  async getLatest(limit = 3) {
    let eventos;
    try {
      eventos = await Evento.findAll({
        order: [['id', 'DESC']],
        limit: limit
      });
    } catch (error) {
      console.error('Erro ao buscar os últimos eventos:', error);
    } finally {
      return eventos;
    }
  }
}

module.exports = new EventoDAO();

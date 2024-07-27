const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../../config/database");
const Noticia = require('../Noticia');

class NoticiaDAO {
  // Cria e persiste uma notícia
  async create({ idUsuario, categoria, titulo, descricao, conteudo }) {
    let newNoticia;
    try {
      newNoticia = await Noticia.create({ idUsuario, categoria, titulo, descricao, conteudo });
    } catch (error) {
      console.error('Erro ao criar notícia:', error);
    } finally {
      return newNoticia; // Retorne a notícia criada
    }
  }

  // Buscar todas as notícias e inserindo nome do autor
  async getAll() {
    let newNoticias;
    try {
      newNoticias = await sequelize.query(
        `SELECT noticia.*, usuarios.nome
         FROM noticia
         LEFT JOIN usuarios
         ON noticia.idUsuario = usuarios.id`,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
    } finally {
      return newNoticias;
    }
  }

  // Busca uma notícia no banco de dados pela sua ID, incluindo o nome do autor
  async getById(noticiaId) {
    let noticia;
    try {
      noticia = await sequelize.query(
        `SELECT noticia.*, usuarios.nome
         FROM noticia
         LEFT JOIN usuarios
         ON noticia.idUsuario = usuarios.id
         WHERE noticia.id = :noticiaId`,
        {
          replacements: { noticiaId: noticiaId },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      // As consultas SELECT com sequelize.query retornam um array, então pegamos o primeiro elemento.
      noticia = noticia[0];
    } catch (error) {
      console.error('Erro ao buscar notícia por ID:', error);
    } finally {
      return noticia;
    }
  }

  // Atualiza uma notícia no banco de dados
  async update(noticiaId, noticiaAtualizada) {
    let noticia;
    try {
      noticia = await Noticia.findByPk(noticiaId);
      if (noticia) {
        noticia.idUsuario = noticiaAtualizada.idUsuario || noticia.idUsuario;
        noticia.categoria = noticiaAtualizada.categoria || noticia.categoria;
        noticia.titulo = noticiaAtualizada.titulo || noticia.titulo;
        noticia.descricao = noticiaAtualizada.descricao || noticia.descricao;
        noticia.conteudo = noticiaAtualizada.conteudo || noticia.conteudo;
        await noticia.save();
      } else {
        console.log('Notícia não encontrada para atualização.');
      }
    } catch (error) {
      console.error('Erro ao atualizar notícia:', error);
    } finally {
      return noticia;
    }
  }

  // Exclui uma notícia do banco de dados
  async delete(noticiaId) {
    let deletado = false;
    try {
      const noticia = await Noticia.findByPk(noticiaId);
      if (noticia) {
        await noticia.destroy();
        deletado = true;
      } else {
        console.error('Notícia não encontrada para exclusão.');
      }
    } catch (error) {
      console.error('Erro ao excluir notícia:', error);
    } finally {
      return deletado;
    }
  }

  // Busca uma notícia no banco de dados por qualquer campo especificado na query
  async findOne(query) {
    let noticia;
    try {
      noticia = await Noticia.findOne({ where: query });
    } catch (error) {
      console.error('Erro ao buscar notícia:', error);
    } finally {
      return noticia;
    }
  }

  // Buscar últimas notícias inserindo nome do autor
  async getLatest(limit = 3) {
    let noticias;
    try {
      noticias = await Noticia.findAll({
        order: [['id', 'DESC']],
        limit: limit,
        include: {
          model: Usuario,
          as: 'autor',
          attributes: ['nome']
        }
      });
    } catch (error) {
      console.error('Erro ao buscar as últimas notícias:', error);
    } finally {
      return noticias;
    }
  }
}

module.exports = new NoticiaDAO();

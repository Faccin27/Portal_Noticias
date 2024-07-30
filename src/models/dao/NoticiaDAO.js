const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../../config/database");
const Noticia = require('../Noticia');

class NoticiaDAO {
  // Cria e persiste uma notícia com suporte para imagem
  async create({ idUsuario, categoria, titulo, descricao, conteudo, imagemUrl }) {
    let newNoticia;
    try {
      newNoticia = await Noticia.create({ idUsuario, categoria, titulo, descricao, conteudo, imagemUrl });
    } catch (error) {
      console.error('Erro ao criar notícia:', error);
    } finally {
      return newNoticia; // Retorne a notícia criada
    }
  }
  
  // Buscar todas as notícias e inserir nome do autor
  async getAll() {
    let noticias;
    try {
      noticias = await sequelize.query(
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
      return noticias;
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
        noticia.titulo = noticiaAtualizada.titulo || noticia.titulo;
        noticia.descricao = noticiaAtualizada.descricao || noticia.descricao;
        noticia.conteudo = noticiaAtualizada.conteudo || noticia.conteudo;
        noticia.imagemUrl = noticiaAtualizada.imagemUrl || noticia.imagemUrl; // Atualiza a URL da imagem
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
        limit: limit
      });
    } catch (error) {
      console.error('Erro ao buscar as últimas notícias:', error);
    } finally {
      return noticias;
    }
  }
}

module.exports = new NoticiaDAO();

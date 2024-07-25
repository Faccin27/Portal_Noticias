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

  // Busca todas as notícias do banco de dados
  async getAll() {
    let noticias;
    try {
      noticias = await Noticia.findAll();
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
    } finally {
      return noticias;
    }
  }

  // Busca uma notícia no banco de dados pela sua ID
  async getById(noticiaId) {
    let noticia;
    try {
      noticia = await Noticia.findByPk(noticiaId);
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
        noticia.idUsuario = noticiaAtualizada.idUsuario || noticia.idUsuario; // Atualiza o campo de idUsuario se ele foi alterado
        noticia.categoria = noticiaAtualizada.categoria || noticia.categoria; // Atualiza o campo de categoria se ele foi alterado
        noticia.titulo = noticiaAtualizada.titulo || noticia.titulo; // Atualiza o campo de título se ele foi alterado
        noticia.descricao = noticiaAtualizada.descricao || noticia.descricao; // Atualiza o campo de descrição se ele foi alterado
        noticia.conteudo = noticiaAtualizada.conteudo || noticia.conteudo; // Atualiza o campo de conteúdo se ele foi alterado
        await noticia.save(); // Salve as alterações
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
}

module.exports = new NoticiaDAO();

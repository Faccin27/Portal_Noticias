const Curtida = require('../Curtida'); // Importe o modelo de curtida

class CurtidaDAO {
  // Cria e persiste uma curtida
  async create({ usuario_id, tipo_item, item_id }) {
    let newCurtida;
    try {
      newCurtida = await Curtida.create({ usuario_id, tipo_item, item_id });
    } catch (error) {
      console.error('Erro ao criar curtida:', error);
    } finally {
      return newCurtida; // Retorne a curtida criada
    }
  }

  // Busca todas as curtidas do banco de dados
  async getAll() {
    let curtidas;
    try {
      curtidas = await Curtida.findAll();
    } catch (error) {
      console.error('Erro ao buscar curtidas:', error);
      throw error; // Lança o erro novamente
    }
    return curtidas;
  }
  

  async countLikesByItem(tipo_item, item_id) {
    let count = 0;
    try {
      count = await Curtida.count({
        where: {
          tipo_item,
          item_id
        }
      });
    } catch (error) {
      console.error('Erro ao contar curtidas:', error);
    } finally {
      return count;
    }
  }

  // Busca uma curtida no banco de dados pela sua ID
  async getById(curtidaId) {
    let curtida;
    try {
      curtida = await Curtida.findByPk(curtidaId);
    } catch (error) {
      console.error('Erro ao buscar curtida por ID:', error);
    } finally {
      return curtida;
    }
  }

  // Exclui uma curtida do banco de dados
  async delete(curtidaId) {
    let deletado = false;
    try {
      const curtida = await Curtida.findByPk(curtidaId);
      if (curtida) {
        await curtida.destroy();
        deletado = true;
      } else {
        console.error('Curtida não encontrada para exclusão.');
      }
    } catch (error) {
      console.error('Erro ao excluir curtida:', error);
    } finally {
      return deletado;
    }
  }
}

module.exports = new CurtidaDAO();

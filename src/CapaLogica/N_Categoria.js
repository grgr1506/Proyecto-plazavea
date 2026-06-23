const BaseDAO = require('./BaseDAO');

/**
 * Clase N_Categoria - Lógica de negocio de Categorías
 * Principio POO: Herencia (extiende BaseDAO)
 */
class N_Categoria extends BaseDAO {
  constructor() { super(); }

  async mostrar(buscar) {
    return await this.query('SELECT * FROM sp_listar_categoria($1)', [buscar]);
  }

  async insertar(dts) {
    await this.ejecutar('CALL sp_guardar_categoria($1)', [dts.ncategoria]);
    return true;
  }

  async editar(dts) {
    await this.ejecutar('CALL sp_editar_categoria($1, $2)', [dts.idcategoria, dts.ncategoria]);
    return true;
  }

  async eliminar(dts) {
    await this.ejecutar('CALL sp_eliminar_categoria($1)', [dts.idcategoria]);
    return true;
  }
}

module.exports = N_Categoria;

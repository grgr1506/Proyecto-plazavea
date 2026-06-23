const BaseDAO = require('./BaseDAO');

class N_Categoria extends BaseDAO {
  constructor() { super(); }

  async mostrar() {
    return await this.query('SELECT * FROM sp_listar_categoria()');
  }
  async insertar(dts) {
    await this.ejecutar('CALL registrarcategoria($1)', [dts.descripcion]);
  }
  async editar(dts) {
    await this.ejecutar('UPDATE categoria SET descripcion=$2 WHERE idcategoria=$1', [dts.idcategoria, dts.descripcion]);
  }
  async eliminar(dts) {
    await this.ejecutar('DELETE FROM categoria WHERE idcategoria=$1', [dts.idcategoria]);
  }
}
module.exports = N_Categoria;

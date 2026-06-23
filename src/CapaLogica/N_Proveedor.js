const BaseDAO = require('./BaseDAO');

class N_Proveedor extends BaseDAO {
  constructor() { super(); }

  async mostrar() {
    return await this.query('SELECT * FROM sp_listar_proveedor()');
  }
  async insertar(dts) {
    await this.ejecutar('CALL sp_guardar_proveedor($1,$2,$3,$4,$5)',
      [dts.idproveedor, dts.razonsocial, dts.ruc, dts.telefono, dts.direccion]);
  }
  async editar(dts) {
    await this.ejecutar('CALL sp_editar_proveedor($1,$2,$3,$4,$5)',
      [dts.idproveedor, dts.razonsocial, dts.ruc, dts.telefono, dts.direccion]);
  }
  async eliminar(dts) {
    await this.ejecutar('CALL sp_eliminar_proveedor($1)', [dts.idproveedor]);
  }
}
module.exports = N_Proveedor;

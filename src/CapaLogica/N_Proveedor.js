const BaseDAO = require('./BaseDAO');

/**
 * Clase N_Proveedor - Lógica de negocio de Proveedores
 * Principio POO: Herencia (extiende BaseDAO)
 */
class N_Proveedor extends BaseDAO {
  constructor() { super(); }

  async mostrar(buscar) {
    return await this.query('SELECT * FROM sp_listar_proveedor($1)', [buscar]);
  }

  async insertar(dts) {
    await this.ejecutar('CALL sp_guardar_proveedor($1, $2, $3, $4, $5)',
      [dts.idprovedor, dts.razonsocial, dts.ruc, dts.telefono, dts.direccion]);
    return true;
  }

  async editar(dts) {
    await this.ejecutar('CALL sp_editar_proveedor($1, $2, $3, $4, $5)',
      [dts.idprovedor, dts.razonsocial, dts.ruc, dts.telefono, dts.direccion]);
    return true;
  }

  async eliminar(dts) {
    await this.ejecutar('CALL sp_eliminar_proveedor($1)', [dts.idprovedor]);
    return true;
  }
}

module.exports = N_Proveedor;

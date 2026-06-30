const BaseDAO = require('./BaseDAO');

/**
 * Clase N_Cliente - Lógica de negocio de Clientes
 * Principio POO: Herencia (extiende BaseDAO)
 */
class N_Cliente extends BaseDAO {
  constructor() { super(); }

async mostrar(buscar) {
    return await this.query('SELECT * FROM sp_listar_cliente($1)', [buscar || '']);
}

  async insertar(dts) {
    await this.ejecutar('CALL sp_guardar_cliente($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [dts.idcliente, dts.nombre, dts.apellidos, dts.dni, dts.ruc, dts.edad, dts.sexo, dts.telefono, dts.direccion]);
    return true;
  }

  async editar(dts) {
    await this.ejecutar('CALL sp_editar_cliente($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [dts.idcliente, dts.nombre, dts.apellidos, dts.dni, dts.ruc, dts.edad, dts.sexo, dts.telefono, dts.direccion]);
    return true;
  }

  async eliminar(dts) {
    await this.ejecutar('CALL sp_eliminar_cliente($1)', [dts.idcliente]);
    return true;
  }
}

module.exports = N_Cliente;

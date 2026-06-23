const BaseDAO = require('./BaseDAO');

/**
 * Clase N_Empleado - Lógica de negocio de Empleados
 * Principio POO: Herencia (extiende BaseDAO)
 */
class N_Empleado extends BaseDAO {
  constructor() { super(); }

  async mostrar(buscar) {
    return await this.query('SELECT * FROM sp_listar_empleado($1)', [buscar]);
  }

  async insertar(dts) {
    await this.ejecutar('CALL sp_guardar_empleado($1, $2, $3, $4, $5, $6)',
      [dts.idempleado, dts.nombre, dts.apellidos, dts.dni, dts.telefono, dts.direccion]);
    return true;
  }

  async editar(dts) {
    await this.ejecutar('CALL sp_editar_empleado($1, $2, $3, $4, $5, $6)',
      [dts.idempleado, dts.nombre, dts.apellidos, dts.dni, dts.telefono, dts.direccion]);
    return true;
  }

  async eliminar(dts) {
    await this.ejecutar('CALL sp_eliminar_empleado($1)', [dts.idempleado]);
    return true;
  }
}

module.exports = N_Empleado;

const BaseDAO = require('./BaseDAO');

class N_Empleado extends BaseDAO {
  constructor() { super(); }

  async mostrar() {
    return await this.query('SELECT * FROM sp_listar_empleados()');
  }
  async insertar(dts) {
    await this.ejecutar('CALL sp_guardar_empleados($1,$2,$3,$4,$5,$6)',
      [dts.idempleado, dts.nombre, dts.apellidos, dts.dni, dts.telefono, dts.direccion]);
  }
  async editar(dts) {
    await this.ejecutar('CALL sp_editar_empleados($1,$2,$3,$4,$5,$6)',
      [dts.idempleado, dts.nombre, dts.apellidos, dts.dni, dts.telefono, dts.direccion]);
  }
  async eliminar(dts) {
    await this.ejecutar('CALL sp_eliminar_empleado($1)', [dts.idempleado]);
  }
}
module.exports = N_Empleado;

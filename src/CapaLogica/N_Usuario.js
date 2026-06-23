const BaseDAO = require('./BaseDAO');
const M_Usuario = require('../CapaDatos/M_Usuario');

class N_Usuario extends BaseDAO {
  constructor() { super(); }

  async logeo(usuario, password) {
    return await this.query('SELECT * FROM sp_sesion($1,$2)', [usuario, password]);
  }
  async mostrar(buscar) {
    return await this.query('SELECT * FROM sp_listar_usuario($1)', [buscar || '']);
  }
  async insertar(dts) {
    await this.ejecutar('CALL sp_guardar_usuarios($1,$2,$3,$4,CAST($5 AS char))',
      [dts.idempleado, dts.usuario, dts.pass, dts.acceso, dts.estado]);
  }
  async editar(dts) {
    await this.ejecutar('CALL sp_editar_usuarios($1,$2,$3,$4,CAST($5 AS char))',
      [dts.idempleado, dts.usuario, dts.pass, dts.acceso, dts.estado]);
  }
  async eliminar(dts) {
    await this.ejecutar('CALL sp_eliminar_usuarios(CAST($1 AS integer))', [dts.idusuario]);
  }
}
module.exports = N_Usuario;

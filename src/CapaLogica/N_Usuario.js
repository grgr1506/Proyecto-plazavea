const BaseDAO = require('./BaseDAO');
const M_Usuario = require('../CapaDatos/M_Usuario');

/**
 * Clase N_Usuario - Lógica de negocio de Usuarios
 * Principio POO: Herencia (extiende BaseDAO), Encapsulamiento
 */
class N_Usuario extends BaseDAO {
  constructor() {
    super(); // Llama al constructor de BaseDAO → obtiene la conexión
  }

  async logeo(usuario, password) {
    const rows = await this.query('SELECT * FROM sp_sesion($1, $2)', [usuario, password]);
    return rows;
  }

  async mostrar(buscar) {
    return await this.query('SELECT * FROM sp_listar_usuario($1)', [buscar]);
  }

  async insertar(dts) {
    // dts es una instancia de M_Usuario → accedemos vía getters
    await this.ejecutar('CALL sp_guardar_usuarios($1, $2, $3, $4, $5)', [
      dts.idempleado, dts.usuario, dts.password, dts.acceso, dts.estado,
    ]);
    return true;
  }

  async editar(dts) {
    await this.ejecutar('CALL sp_editar_usuarios($1, $2, $3, $4, $5)', [
      dts.idempleado, dts.usuario, dts.password, dts.acceso, dts.estado,
    ]);
    return true;
  }

  async eliminar(dts) {
    await this.ejecutar('CALL sp_eliminar_usuarios($1)', [dts.idusuario]);
    return true;
  }
}

module.exports = N_Usuario;

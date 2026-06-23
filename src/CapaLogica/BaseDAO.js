const Conexion = require('./Conexion');

/**
 * Clase BaseDAO - Clase base abstracta
 * Principio POO: Herencia y Abstracción
 * Todas las clases N_ heredan de esta clase para reutilizar la conexión
 */
class BaseDAO {
  constructor() {
    this.pool = Conexion.conectar();
  }

  /**
   * Ejecuta una query de solo lectura
   */
  async query(sql, params = []) {
    const result = await this.pool.query(sql, params);
    return result.rows;
  }

  /**
   * Ejecuta un procedimiento almacenado (INSERT/UPDATE/DELETE)
   */
  async ejecutar(sql, params = []) {
    const result = await this.pool.query(sql, params);
    return result.rowCount;
  }

  /**
   * Obtiene un cliente para transacciones
   */
  async obtenerCliente() {
    return await this.pool.connect();
  }
}

module.exports = BaseDAO;

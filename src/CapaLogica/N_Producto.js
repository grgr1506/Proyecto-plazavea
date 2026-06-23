const BaseDAO = require('./BaseDAO');

/**
 * Clase N_Producto - Lógica de negocio de Productos
 * Principio POO: Herencia (extiende BaseDAO)
 */
class N_Producto extends BaseDAO {
  constructor() { super(); }

  async mostrar(buscar) {
    return await this.query('SELECT * FROM sp_listar_producto($1)', [buscar]);
  }

  async insertar(dts) {
    await this.ejecutar(
      'CALL sp_guardar_producto(CAST($1 AS varchar), CAST($2 AS varchar), CAST($3 AS varchar), CAST($4 AS varchar), CAST($5 AS varchar), CAST($6 AS numeric), CAST($7 AS numeric), CAST($8 AS integer))',
      [dts.idproducto, dts.serie, dts.nombre, dts.f_ingreso, dts.f_vencimiento, dts.p_venta, dts.p_compra, dts.idcategoria]
    );
    return true;
  }

  async editar(dts) {
    await this.ejecutar(
      'CALL sp_editar_producto(CAST($1 AS varchar), CAST($2 AS varchar), CAST($3 AS varchar), CAST($4 AS varchar), CAST($5 AS varchar), CAST($6 AS numeric), CAST($7 AS numeric), CAST($8 AS integer))',
      [dts.idproducto, dts.serie, dts.nombre, dts.f_ingreso, dts.f_vencimiento, dts.p_venta, dts.p_compra, dts.idcategoria]
    );
    return true;
  }

  async eliminar(dts) {
    await this.ejecutar('CALL sp_eliminar_producto($1)', [dts.idproducto]);
    return true;
  }

  async aumentar(idproducto, cantidad) {
    await this.ejecutar(
      'UPDATE productos SET cantidad = cantidad + $1 WHERE idproducto = $2',
      [cantidad, idproducto]
    );
    return true;
  }

  async disminuir(idproducto, cantidad) {
    await this.ejecutar(
      'UPDATE productos SET cantidad = cantidad - $1 WHERE idproducto = $2',
      [cantidad, idproducto]
    );
    return true;
  }
}

module.exports = N_Producto;

const BaseDAO = require('./BaseDAO');

class N_Producto extends BaseDAO {
  constructor() { super(); }

  async mostrar(buscar) {
    return await this.query('SELECT * FROM sp_listar_producto($1)', [buscar || '']);
  }
  async insertar(dts) {
    await this.ejecutar(
      'CALL sp_guardar_producto($1,$2,$3,$4,$5,CAST($6 AS numeric),CAST($7 AS numeric),CAST($8 AS integer))',
      [dts.idproducto, dts.serie, dts.nombre, dts.f_ingreso, dts.f_vencimiento, dts.prec_compra, dts.prec_venta, dts.idcategoria]
    );
  }
  async editar(dts) {
    await this.ejecutar(
      'CALL sp_editar_producto($1,$2,$3,$4,$5,CAST($6 AS numeric),CAST($7 AS numeric),CAST($8 AS integer))',
      [dts.idproducto, dts.serie, dts.nombre, dts.f_ingreso, dts.f_vencimiento, dts.prec_compra, dts.prec_venta, dts.idcategoria]
    );
  }
  async eliminar(dts) {
    await this.ejecutar('CALL sp_eliminar_producto($1)', [dts.idproducto]);
  }
}
module.exports = N_Producto;

const BaseDAO = require('./BaseDAO');
const N_Producto = require('./N_Producto');

class N_Compra extends BaseDAO {
  #nProducto;
  constructor() {
    super();
    this.#nProducto = new N_Producto();
  }

  async mostrar() {
    return await this.query('SELECT * FROM sp_listar_compras()');
  }

  async registrar(compra, detalles) {
    const client = await this.obtenerCliente();
    try {
      await client.query('BEGIN');
      await client.query(
        'CALL sp_guardar_compra($1,$2,$3,$4,CAST($5 AS numeric),CAST($6 AS numeric),CAST($7 AS numeric),$8,CAST($9 AS integer),$10)',
        [compra.fecha, compra.hora, compra.num_documento, compra.tipo_documento,
         compra.subtotal, compra.igv, compra.total, compra.estado,
         compra.idusuario, compra.idproveedor]
      );
      const r = await client.query('SELECT MAX(idcompra) as id FROM compras');
      const idcompra = r.rows[0].id;
      for (const d of detalles) {
        await client.query(
          'CALL sp_guardar_detalle_compras(CAST($1 AS integer),$2,CAST($3 AS integer),CAST($4 AS numeric),CAST($5 AS numeric))',
          [idcompra, d.idproducto, d.cantidad, d.precio, d.total]
        );
        await client.query('UPDATE productos SET cantidad=cantidad+$1 WHERE idproducto=$2', [d.cantidad, d.idproducto]);
      }
      await client.query('COMMIT');
      return idcompra;
    } catch(e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}
module.exports = N_Compra;

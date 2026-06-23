const BaseDAO = require('./BaseDAO');
const N_Producto = require('./N_Producto');

/**
 * Clase N_Compra - Lógica de negocio de Compras
 * Principio POO: Herencia (extiende BaseDAO), Composición (usa N_Producto)
 */
class N_Compra extends BaseDAO {
  #nProducto; // Composición: N_Compra usa N_Producto

  constructor() {
    super();
    this.#nProducto = new N_Producto(); // reutiliza lógica de producto
  }

  async mostrar(buscar) {
    return await this.query('SELECT * FROM sp_listar_compra($1)', [buscar]);
  }

  /**
   * Registra una compra con su detalle en una transacción
   * @param {M_Compra} compra
   * @param {Array} detalles - [{idproducto, cantidad, precio, total}]
   */
  async registrar(compra, detalles) {
    const client = await this.obtenerCliente();
    try {
      await client.query('BEGIN');

      // Insertar compra
      await client.query(
        'CALL sp_guardar_compra($1, $2, $3, $4, CAST($5 AS numeric), CAST($6 AS numeric), CAST($7 AS numeric), $8, $9, $10, null)',
        [compra.fecha, compra.hora, compra.num_documento, compra.tipo_documento,
         compra.subtotal, compra.igv, compra.total, compra.estado,
         compra.idusuario, compra.idproveedor]
      );

      // Obtener ID de la compra recién insertada
      const r = await client.query('SELECT MAX(idcompra) as id FROM compras');
      const idcompra = r.rows[0].id;

      // Insertar detalle y actualizar stock
      for (const d of detalles) {
        await client.query(
          'CALL sp_guardar_detalle_compra($1, $2, $3, CAST($4 AS numeric), CAST($5 AS numeric))',
          [idcompra, d.idproducto, d.cantidad, d.precio, d.total]
        );
        // Aumentar stock usando la clase N_Producto (Composición)
        await client.query(
          'UPDATE productos SET cantidad = cantidad + $1 WHERE idproducto = $2',
          [d.cantidad, d.idproducto]
        );
      }

      await client.query('COMMIT');
      return idcompra;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}

module.exports = N_Compra;

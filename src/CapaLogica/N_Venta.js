const BaseDAO = require('./BaseDAO');

/**
 * Clase N_Venta - Lógica de negocio de Ventas
 * Principio POO: Herencia (extiende BaseDAO), Composición (usa N_Producto)
 */
class N_Venta extends BaseDAO {
  constructor() { super(); }

  async mostrar(buscar) {
    return await this.query('SELECT * FROM sp_listar_venta($1)', [buscar]);
  }

  /**
   * Registra una venta con su detalle en una transacción
   * @param {M_Venta} venta
   * @param {Array} detalles - [{idproducto, cantidad, precio, total}]
   */
  async registrar(venta, detalles) {
    const client = await this.obtenerCliente();
    try {
      await client.query('BEGIN');

      // Insertar venta
      await client.query(
        'CALL sp_guardar_venta($1, $2, $3, $4, $5, CAST($6 AS numeric), CAST($7 AS numeric), CAST($8 AS numeric), $9, $10, $11, null)',
        [venta.fecha, venta.hora, venta.serie, venta.num_documento, venta.tipo_documento,
         venta.subtotal, venta.igv, venta.total, venta.estado,
         venta.idusuario, venta.idcliente]
      );

      // Obtener ID de la venta recién insertada
      const r = await client.query('SELECT MAX(idventa) as id FROM ventas');
      const idventa = r.rows[0].id;

      // Insertar detalle y disminuir stock
      for (const d of detalles) {
        await client.query(
          'CALL sp_guardar_detalle_venta($1, $2, $3, CAST($4 AS numeric), CAST($5 AS numeric))',
          [idventa, d.idproducto, d.cantidad, d.precio, d.total]
        );
        // Disminuir stock
        await client.query(
          'UPDATE productos SET cantidad = cantidad - $1 WHERE idproducto = $2',
          [d.cantidad, d.idproducto]
        );
      }

      await client.query('COMMIT');
      return idventa;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}

module.exports = N_Venta;

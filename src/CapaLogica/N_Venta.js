const BaseDAO = require('./BaseDAO');

class N_Venta extends BaseDAO {
  constructor() { super(); }

  async mostrar() {
    return await this.query('SELECT * FROM sp_listar_ventas()');
  }

  async registrar(venta, detalles) {
    const client = await this.obtenerCliente();
    try {
      await client.query('BEGIN');

      const cantidades = new Map();
      for (const d of detalles) {
        const cantidad = parseInt(d.cantidad, 10) || 0;
        if (cantidad <= 0) throw new Error('La cantidad de venta debe ser mayor a cero');
        cantidades.set(d.idproducto, (cantidades.get(d.idproducto) || 0) + cantidad);
      }

      for (const [idproducto, cantidad] of cantidades) {
        const stockActual = await client.query(
          'SELECT nombre, cantidad FROM productos WHERE idproducto=$1 FOR UPDATE',
          [idproducto]
        );
        if (!stockActual.rows.length) throw new Error('Producto no encontrado: ' + idproducto);

        const producto = stockActual.rows[0];
        const disponible = Math.max(0, parseInt(producto.cantidad, 10) || 0);
        if (cantidad > disponible) {
          throw new Error('Stock insuficiente para ' + (producto.nombre || idproducto) + '. Disponible: ' + disponible);
        }
      }

      await client.query(
        'CALL sp_guardar_venta($1,$2,$3,$4,$5,CAST($6 AS numeric),CAST($7 AS numeric),CAST($8 AS numeric),$9,CAST($10 AS integer),$11)',
        [venta.fecha, venta.hora, venta.serie, venta.num_documento, venta.tipo_documento,
         venta.subtotal, venta.igv, venta.total, venta.estado,
         venta.idusuario, venta.idcliente]
      );
      const r = await client.query('SELECT MAX(idventa) as id FROM ventas');
      const idventa = r.rows[0].id;
      for (const d of detalles) {
        await client.query(
          'CALL sp_guardar_detalle_venta(CAST($1 AS integer),$2,CAST($3 AS integer),CAST($4 AS numeric),CAST($5 AS numeric))',
          [idventa, d.idproducto, d.cantidad, d.precio, d.total]
        );
      }
      await client.query('COMMIT');
      return idventa;
    } catch(e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}
module.exports = N_Venta;

/**
 * Clase M_Producto - Modelo de datos del Producto
 * Principio POO: Encapsulamiento
 */
class M_Producto {
  #idproducto;
  #idcategoria;
  #serie;
  #nombre;
  #f_ingreso;
  #f_vencimiento;
  #p_venta;
  #p_compra;

  constructor(idproducto = '', idcategoria = 0, serie = '', nombre = '',
              f_ingreso = null, f_vencimiento = null, p_venta = 0, p_compra = 0) {
    this.#idproducto    = idproducto;
    this.#idcategoria   = idcategoria;
    this.#serie         = serie;
    this.#nombre        = nombre;
    this.#f_ingreso     = f_ingreso;
    this.#f_vencimiento = f_vencimiento;
    this.#p_venta       = p_venta;
    this.#p_compra      = p_compra;
  }

  get idproducto()     { return this.#idproducto; }
  set idproducto(v)    { this.#idproducto = v; }

  get idcategoria()    { return this.#idcategoria; }
  set idcategoria(v)   { this.#idcategoria = v; }

  get serie()          { return this.#serie; }
  set serie(v)         { this.#serie = v; }

  get nombre()         { return this.#nombre; }
  set nombre(v)        { this.#nombre = v; }

  get f_ingreso()      { return this.#f_ingreso; }
  set f_ingreso(v)     { this.#f_ingreso = v; }

  get f_vencimiento()  { return this.#f_vencimiento; }
  set f_vencimiento(v) { this.#f_vencimiento = v; }

  get p_venta()        { return this.#p_venta; }
  set p_venta(v)       { this.#p_venta = v; }

  get p_compra()       { return this.#p_compra; }
  set p_compra(v)      { this.#p_compra = v; }
}

module.exports = M_Producto;

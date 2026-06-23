class M_Producto {
  #idproducto; #serie; #nombre; #f_ingreso; #f_vencimiento; #prec_compra; #prec_venta; #cantidad; #idcategoria;
  get idproducto()    { return this.#idproducto; }    set idproducto(v)    { this.#idproducto = v; }
  get serie()         { return this.#serie; }          set serie(v)         { this.#serie = v; }
  get nombre()        { return this.#nombre; }         set nombre(v)        { this.#nombre = v; }
  get f_ingreso()     { return this.#f_ingreso; }      set f_ingreso(v)     { this.#f_ingreso = v; }
  get f_vencimiento() { return this.#f_vencimiento; }  set f_vencimiento(v) { this.#f_vencimiento = v; }
  get prec_compra()   { return this.#prec_compra; }    set prec_compra(v)   { this.#prec_compra = v; }
  get prec_venta()    { return this.#prec_venta; }     set prec_venta(v)    { this.#prec_venta = v; }
  get cantidad()      { return this.#cantidad; }        set cantidad(v)      { this.#cantidad = v; }
  get idcategoria()   { return this.#idcategoria; }    set idcategoria(v)   { this.#idcategoria = v; }
}
module.exports = M_Producto;

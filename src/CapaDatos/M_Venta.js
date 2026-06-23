class M_Venta {
  #idventa; #fecha; #hora; #serie; #num_documento; #tipo_documento; #subtotal; #igv; #total; #estado; #idusuario; #idcliente;
  get idventa()        { return this.#idventa; }         set idventa(v)        { this.#idventa = v; }
  get fecha()          { return this.#fecha; }            set fecha(v)          { this.#fecha = v; }
  get hora()           { return this.#hora; }             set hora(v)           { this.#hora = v; }
  get serie()          { return this.#serie; }            set serie(v)          { this.#serie = v; }
  get num_documento()  { return this.#num_documento; }    set num_documento(v)  { this.#num_documento = v; }
  get tipo_documento() { return this.#tipo_documento; }   set tipo_documento(v) { this.#tipo_documento = v; }
  get subtotal()       { return this.#subtotal; }         set subtotal(v)       { this.#subtotal = v; }
  get igv()            { return this.#igv; }              set igv(v)            { this.#igv = v; }
  get total()          { return this.#total; }            set total(v)          { this.#total = v; }
  get estado()         { return this.#estado; }           set estado(v)         { this.#estado = v; }
  get idusuario()      { return this.#idusuario; }        set idusuario(v)      { this.#idusuario = v; }
  get idcliente()      { return this.#idcliente; }        set idcliente(v)      { this.#idcliente = v; }
}
module.exports = M_Venta;

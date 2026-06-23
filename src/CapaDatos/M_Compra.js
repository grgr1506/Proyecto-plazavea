/**
 * Clase M_Compra - Modelo de datos de Compra
 * Principio POO: Encapsulamiento
 */
class M_Compra {
  #idcompra;
  #fecha;
  #hora;
  #num_documento;
  #tipo_documento;
  #subtotal;
  #igv;
  #total;
  #estado;
  #idusuario;
  #idproveedor;

  constructor(idcompra = 0, fecha = null, hora = '', num_documento = '',
              tipo_documento = '', subtotal = 0, igv = 0, total = 0,
              estado = '', idusuario = 0, idproveedor = '') {
    this.#idcompra       = idcompra;
    this.#fecha          = fecha;
    this.#hora           = hora;
    this.#num_documento  = num_documento;
    this.#tipo_documento = tipo_documento;
    this.#subtotal       = subtotal;
    this.#igv            = igv;
    this.#total          = total;
    this.#estado         = estado;
    this.#idusuario      = idusuario;
    this.#idproveedor    = idproveedor;
  }

  get idcompra()        { return this.#idcompra; }
  set idcompra(v)       { this.#idcompra = v; }
  get fecha()           { return this.#fecha; }
  set fecha(v)          { this.#fecha = v; }
  get hora()            { return this.#hora; }
  set hora(v)           { this.#hora = v; }
  get num_documento()   { return this.#num_documento; }
  set num_documento(v)  { this.#num_documento = v; }
  get tipo_documento()  { return this.#tipo_documento; }
  set tipo_documento(v) { this.#tipo_documento = v; }
  get subtotal()        { return this.#subtotal; }
  set subtotal(v)       { this.#subtotal = v; }
  get igv()             { return this.#igv; }
  set igv(v)            { this.#igv = v; }
  get total()           { return this.#total; }
  set total(v)          { this.#total = v; }
  get estado()          { return this.#estado; }
  set estado(v)         { this.#estado = v; }
  get idusuario()       { return this.#idusuario; }
  set idusuario(v)      { this.#idusuario = v; }
  get idproveedor()     { return this.#idproveedor; }
  set idproveedor(v)    { this.#idproveedor = v; }
}

module.exports = M_Compra;

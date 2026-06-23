/**
 * Clase M_Proveedor - Modelo de datos del Proveedor
 * Principio POO: Encapsulamiento
 */
class M_Proveedor {
  #idprovedor;
  #razonsocial;
  #ruc;
  #telefono;
  #direccion;

  constructor(idprovedor = '', razonsocial = '', ruc = '', telefono = '', direccion = '') {
    this.#idprovedor  = idprovedor;
    this.#razonsocial = razonsocial;
    this.#ruc         = ruc;
    this.#telefono    = telefono;
    this.#direccion   = direccion;
  }

  get idprovedor()   { return this.#idprovedor; }
  set idprovedor(v)  { this.#idprovedor = v; }

  get razonsocial()  { return this.#razonsocial; }
  set razonsocial(v) { this.#razonsocial = v; }

  get ruc()          { return this.#ruc; }
  set ruc(v)         { this.#ruc = v; }

  get telefono()     { return this.#telefono; }
  set telefono(v)    { this.#telefono = v; }

  get direccion()    { return this.#direccion; }
  set direccion(v)   { this.#direccion = v; }
}

module.exports = M_Proveedor;

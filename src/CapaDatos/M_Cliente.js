/**
 * Clase M_Cliente - Modelo de datos del Cliente
 * Principio POO: Encapsulamiento
 */
class M_Cliente {
  #codigo;
  #apellidos;
  #nombres;
  #dni;
  #ruc;
  #edad;
  #sexo;
  #telefono;
  #direccion;

  constructor(codigo = '', apellidos = '', nombres = '', dni = '',
              ruc = '', edad = 0, sexo = 'M', telefono = '', direccion = '') {
    this.#codigo    = codigo;
    this.#apellidos = apellidos;
    this.#nombres   = nombres;
    this.#dni       = dni;
    this.#ruc       = ruc;
    this.#edad      = edad;
    this.#sexo      = sexo;
    this.#telefono  = telefono;
    this.#direccion = direccion;
  }

  get codigo()     { return this.#codigo; }
  set codigo(v)    { this.#codigo = v; }

  get apellidos()  { return this.#apellidos; }
  set apellidos(v) { this.#apellidos = v; }

  get nombres()    { return this.#nombres; }
  set nombres(v)   { this.#nombres = v; }

  get dni()        { return this.#dni; }
  set dni(v)       { this.#dni = v; }

  get ruc()        { return this.#ruc; }
  set ruc(v)       { this.#ruc = v; }

  get edad()       { return this.#edad; }
  set edad(v)      { this.#edad = v; }

  get sexo()       { return this.#sexo; }
  set sexo(v)      { this.#sexo = v; }

  get telefono()   { return this.#telefono; }
  set telefono(v)  { this.#telefono = v; }

  get direccion()  { return this.#direccion; }
  set direccion(v) { this.#direccion = v; }
}

module.exports = M_Cliente;

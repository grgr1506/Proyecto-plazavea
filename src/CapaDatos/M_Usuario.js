/**
 * Clase M_Usuario - Modelo de datos del Usuario
 * Principio POO: Encapsulamiento (campos privados con getters/setters)
 */
class M_Usuario {
  #idusuario;
  #idempleado;
  #usuario;
  #password;
  #acceso;
  #estado;

  constructor(idusuario = 0, idempleado = '', usuario = '', password = '', acceso = '', estado = '') {
    this.#idusuario  = idusuario;
    this.#idempleado = idempleado;
    this.#usuario    = usuario;
    this.#password   = password;
    this.#acceso     = acceso;
    this.#estado     = estado;
  }

  get idusuario()  { return this.#idusuario; }
  set idusuario(v) { this.#idusuario = v; }

  get idempleado()  { return this.#idempleado; }
  set idempleado(v) { this.#idempleado = v; }

  get usuario()  { return this.#usuario; }
  set usuario(v) { this.#usuario = v; }

  get password()  { return this.#password; }
  set password(v) { this.#password = v; }

  get acceso()  { return this.#acceso; }
  set acceso(v) { this.#acceso = v; }

  get estado()  { return this.#estado; }
  set estado(v) { this.#estado = v; }
}

module.exports = M_Usuario;

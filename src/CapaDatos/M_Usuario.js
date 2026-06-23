class M_Usuario {
  #idusuario; #idempleado; #usuario; #pass; #acceso; #estado;
  get idusuario()  { return this.#idusuario; }  set idusuario(v)  { this.#idusuario = v; }
  get idempleado() { return this.#idempleado; } set idempleado(v) { this.#idempleado = v; }
  get usuario()    { return this.#usuario; }     set usuario(v)    { this.#usuario = v; }
  get pass()       { return this.#pass; }        set pass(v)       { this.#pass = v; }
  get acceso()     { return this.#acceso; }      set acceso(v)     { this.#acceso = v; }
  get estado()     { return this.#estado; }      set estado(v)     { this.#estado = v; }
}
module.exports = M_Usuario;

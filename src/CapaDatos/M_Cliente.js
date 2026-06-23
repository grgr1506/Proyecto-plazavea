class M_Cliente {
  #idcliente; #nombre; #apellidos; #dni; #ruc; #edad; #sexo; #telefono; #direccion;
  get idcliente()  { return this.#idcliente; }  set idcliente(v)  { this.#idcliente = v; }
  get nombre()     { return this.#nombre; }      set nombre(v)     { this.#nombre = v; }
  get apellidos()  { return this.#apellidos; }   set apellidos(v)  { this.#apellidos = v; }
  get dni()        { return this.#dni; }          set dni(v)        { this.#dni = v; }
  get ruc()        { return this.#ruc; }          set ruc(v)        { this.#ruc = v; }
  get edad()       { return this.#edad; }         set edad(v)       { this.#edad = v; }
  get sexo()       { return this.#sexo; }         set sexo(v)       { this.#sexo = v; }
  get telefono()   { return this.#telefono; }     set telefono(v)   { this.#telefono = v; }
  get direccion()  { return this.#direccion; }    set direccion(v)  { this.#direccion = v; }
}
module.exports = M_Cliente;

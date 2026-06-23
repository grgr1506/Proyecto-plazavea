class M_Empleado {
  #idempleado; #nombre; #apellidos; #dni; #telefono; #direccion;
  get idempleado() { return this.#idempleado; } set idempleado(v) { this.#idempleado = v; }
  get nombre()     { return this.#nombre; }      set nombre(v)     { this.#nombre = v; }
  get apellidos()  { return this.#apellidos; }   set apellidos(v)  { this.#apellidos = v; }
  get dni()        { return this.#dni; }          set dni(v)        { this.#dni = v; }
  get telefono()   { return this.#telefono; }     set telefono(v)   { this.#telefono = v; }
  get direccion()  { return this.#direccion; }    set direccion(v)  { this.#direccion = v; }
}
module.exports = M_Empleado;

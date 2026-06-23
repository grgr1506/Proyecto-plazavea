class M_Proveedor {
  #idproveedor; #razonsocial; #ruc; #telefono; #direccion;
  get idproveedor()  { return this.#idproveedor; }  set idproveedor(v)  { this.#idproveedor = v; }
  get razonsocial()  { return this.#razonsocial; }  set razonsocial(v)  { this.#razonsocial = v; }
  get ruc()          { return this.#ruc; }           set ruc(v)          { this.#ruc = v; }
  get telefono()     { return this.#telefono; }      set telefono(v)     { this.#telefono = v; }
  get direccion()    { return this.#direccion; }     set direccion(v)    { this.#direccion = v; }
}
module.exports = M_Proveedor;

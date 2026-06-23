class M_Categoria {
  #idcategoria; #descripcion;
  get idcategoria() { return this.#idcategoria; } set idcategoria(v) { this.#idcategoria = v; }
  get descripcion()  { return this.#descripcion; }  set descripcion(v)  { this.#descripcion = v; }
}
module.exports = M_Categoria;

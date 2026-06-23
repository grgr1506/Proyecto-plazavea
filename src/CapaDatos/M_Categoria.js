/**
 * Clase M_Categoria - Modelo de datos de Categoría
 * Principio POO: Encapsulamiento
 */
class M_Categoria {
  #idcategoria;
  #ncategoria;

  constructor(idcategoria = 0, ncategoria = '') {
    this.#idcategoria = idcategoria;
    this.#ncategoria  = ncategoria;
  }

  get idcategoria()  { return this.#idcategoria; }
  set idcategoria(v) { this.#idcategoria = v; }

  get ncategoria()  { return this.#ncategoria; }
  set ncategoria(v) { this.#ncategoria = v; }
}

module.exports = M_Categoria;

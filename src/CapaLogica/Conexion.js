const { Pool } = require('pg');

/**
 * Clase Conexion - Patrón Singleton
 * Gestiona la conexión única a la base de datos PostgreSQL (Neon)
 * Principio POO: Encapsulamiento y reutilización
 */
class Conexion {
  static #instancia = null;

  static conectar() {
    if (!Conexion.#instancia) {
      Conexion.#instancia = new Pool({
        connectionString:
          'postgresql://neondb_owner:npg_xp5EF8ImODUn@ep-broad-recipe-aqsnig1s-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
        ssl: { rejectUnauthorized: false },
      });
      console.log('✅ Conexión a base de datos establecida (Singleton)');
    }
    return Conexion.#instancia;
  }
}

module.exports = Conexion;

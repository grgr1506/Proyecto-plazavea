const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_xp5EF8ImODUn@ep-broad-recipe-aqsnig1s-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  // Arreglar todos los usuarios: poner estado='SI' y pass correcto donde sea null
  await pool.query("UPDATE usuarios SET estado='SI' WHERE estado != 'SI' OR estado IS NULL");
  await pool.query("UPDATE usuarios SET pass='1234' WHERE pass IS NULL OR pass=''");
  console.log('Usuarios corregidos');

  const users = await pool.query('SELECT idusuario, usuario, pass, acceso, estado FROM usuarios');
  console.log('Estado actual:');
  users.rows.forEach(r => console.log(' ', r));

  await pool.end();
}
run().catch(e => { console.error('FATAL:', e.message); process.exit(1); });

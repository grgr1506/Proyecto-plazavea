const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_xp5EF8ImODUn@ep-broad-recipe-aqsnig1s-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  // Corregir estado: 'S' → 'SI', cualquier otra cosa que no sea 'SI' → 'SI'
  const r = await pool.query("UPDATE usuarios SET estado='SI' WHERE TRIM(estado) != 'SI'");
  console.log('Usuarios corregidos:', r.rowCount);

  const u = await pool.query('SELECT idusuario, usuario, pass, acceso, estado FROM usuarios');
  console.log('\nEstado final:');
  u.rows.forEach(r => console.log(' ', r));

  await pool.end();
}
run().catch(e => { console.error(e.message); process.exit(1); });

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_xp5EF8ImODUn@ep-broad-recipe-aqsnig1s-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});
async function run() {
  await pool.query("UPDATE usuarios SET estado='SI' WHERE TRIM(estado) != 'SI' OR estado IS NULL");
  console.log('Todos los usuarios con estado SI');
  const r = await pool.query('SELECT idusuario, usuario, pass, estado FROM usuarios');
  r.rows.forEach(x => console.log(x));
  await pool.end();
}
run().catch(e => { console.error(e.message); process.exit(1); });

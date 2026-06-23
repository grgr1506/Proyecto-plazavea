const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_xp5EF8ImODUn@ep-broad-recipe-aqsnig1s-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  // Columnas de cada tabla
  const tablas = ['categoria','clientes','compras','detalle_compras','detalle_ventas','empleados','productos','proveedor','usuarios','ventas'];
  for (const t of tablas) {
    const cols = await pool.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name=$1 ORDER BY ordinal_position`, [t]);
    console.log(`\n=== ${t.toUpperCase()} ===`);
    cols.rows.forEach(r => console.log(`  ${r.column_name} (${r.data_type})`));
  }

  // Parámetros de cada SP
  const sps = await pool.query(`
    SELECT r.routine_name, r.routine_type,
      string_agg(p.parameter_name || ' ' || p.data_type, ', ' ORDER BY p.ordinal_position) as params
    FROM information_schema.routines r
    LEFT JOIN information_schema.parameters p ON p.specific_name = r.specific_name AND p.parameter_mode != 'OUT'
    WHERE r.routine_schema = 'public'
    GROUP BY r.routine_name, r.routine_type
    ORDER BY r.routine_name
  `);
  console.log('\n=== PARAMETROS DE CADA SP ===');
  sps.rows.forEach(r => console.log(`${r.routine_type} ${r.routine_name}(${r.params||''})`));

  await pool.end();
}
run().catch(e => { console.error('FATAL:', e.message); process.exit(1); });

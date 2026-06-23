/**
 * CapaPresentacion - server.js
 * Servidor Express que expone la API REST
 * Usa las clases de CapaLogica (N_*) y CapaDatos (M_*) aplicando POO
 *
 * Principios POO aplicados:
 *  - Encapsulamiento → Clases M_ con campos privados y getters/setters
 *  - Herencia        → Todas las clases N_ extienden BaseDAO
 *  - Abstracción     → BaseDAO abstrae la conexión y queries
 *  - Composición     → N_Compra y N_Venta usan N_Producto internamente
 *  - Singleton       → Conexion garantiza una sola instancia del pool
 */

const express = require('express');
const session = require('express-session');
const cors    = require('cors');
const path    = require('path');

// ── CapaLogica ────────────────────────────────────────────────────────────────
const N_Usuario   = require('./src/CapaLogica/N_Usuario');
const N_Categoria = require('./src/CapaLogica/N_Categoria');
const N_Producto  = require('./src/CapaLogica/N_Producto');
const N_Proveedor = require('./src/CapaLogica/N_Proveedor');
const N_Cliente   = require('./src/CapaLogica/N_Cliente');
const N_Empleado  = require('./src/CapaLogica/N_Empleado');
const N_Compra    = require('./src/CapaLogica/N_Compra');
const N_Venta     = require('./src/CapaLogica/N_Venta');
const Conexion    = require('./src/CapaLogica/Conexion');

// ── CapaDatos ─────────────────────────────────────────────────────────────────
const M_Usuario   = require('./src/CapaDatos/M_Usuario');
const M_Categoria = require('./src/CapaDatos/M_Categoria');
const M_Producto  = require('./src/CapaDatos/M_Producto');
const M_Proveedor = require('./src/CapaDatos/M_Proveedor');
const M_Cliente   = require('./src/CapaDatos/M_Cliente');
const M_Empleado  = require('./src/CapaDatos/M_Empleado');
const M_Compra    = require('./src/CapaDatos/M_Compra');
const M_Venta     = require('./src/CapaDatos/M_Venta');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'plazavea-poo-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 8 * 60 * 60 * 1000 },
}));
app.use(express.static(path.join(__dirname, 'public')));

// ── Auth middleware ───────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  if (req.session?.user) return next();
  res.status(401).json({ error: 'No autenticado' });
}

// ═══════════════════════ AUTH ════════════════════════════════════════════════
app.post('/api/login', async (req, res) => {
  try {
    const func = new N_Usuario();                      // instancia de clase POO
    const dts  = new M_Usuario();                      // modelo POO
    dts.usuario  = req.body.usuario;
    dts.password = req.body.password;

    const rows = await func.logeo(dts.usuario, dts.password);
    if (rows.length > 0) {
      req.session.user = rows[0];
      res.json({ ok: true, user: rows[0] });
    } else {
      res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/me', requireAuth, (req, res) => res.json(req.session.user));

// ═══════════════════════ CATEGORÍAS ══════════════════════════════════════════
app.get('/api/categorias', requireAuth, async (req, res) => {
  try {
    const func = new N_Categoria();
    const data = await func.mostrar(req.query.buscar || '');
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/categorias', requireAuth, async (req, res) => {
  try {
    const func = new N_Categoria();
    const dts  = new M_Categoria();
    dts.ncategoria = req.body.ncategoria;
    await func.insertar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/categorias/:id', requireAuth, async (req, res) => {
  try {
    const func = new N_Categoria();
    const dts  = new M_Categoria();
    dts.idcategoria = req.params.id;
    dts.ncategoria  = req.body.ncategoria;
    await func.editar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/categorias/:id', requireAuth, async (req, res) => {
  try {
    const func = new N_Categoria();
    const dts  = new M_Categoria();
    dts.idcategoria = req.params.id;
    await func.eliminar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══════════════════════ PRODUCTOS ═══════════════════════════════════════════
app.get('/api/productos', requireAuth, async (req, res) => {
  try {
    const func = new N_Producto();
    res.json(await func.mostrar(req.query.buscar || ''));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/productos', requireAuth, async (req, res) => {
  try {
    const func = new N_Producto();
    const dts  = new M_Producto();
    const b = req.body;
    dts.idproducto    = b.idproducto;
    dts.serie         = b.serie;
    dts.nombre        = b.nombre;
    dts.f_ingreso     = b.f_ingreso;
    dts.f_vencimiento = b.f_vencimiento;
    dts.p_venta       = b.p_venta;
    dts.p_compra      = b.p_compra;
    dts.idcategoria   = b.idcategoria;
    await func.insertar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/productos/:id', requireAuth, async (req, res) => {
  try {
    const func = new N_Producto();
    const dts  = new M_Producto();
    const b = req.body;
    dts.idproducto    = req.params.id;
    dts.serie         = b.serie;
    dts.nombre        = b.nombre;
    dts.f_ingreso     = b.f_ingreso;
    dts.f_vencimiento = b.f_vencimiento;
    dts.p_venta       = b.p_venta;
    dts.p_compra      = b.p_compra;
    dts.idcategoria   = b.idcategoria;
    await func.editar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/productos/:id', requireAuth, async (req, res) => {
  try {
    const func = new N_Producto();
    const dts  = new M_Producto();
    dts.idproducto = req.params.id;
    await func.eliminar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══════════════════════ PROVEEDORES ═════════════════════════════════════════
app.get('/api/proveedores', requireAuth, async (req, res) => {
  try {
    res.json(await new N_Proveedor().mostrar(req.query.buscar || ''));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/proveedores', requireAuth, async (req, res) => {
  try {
    const func = new N_Proveedor();
    const dts  = new M_Proveedor();
    const b = req.body;
    dts.idprovedor  = b.idprovedor;
    dts.razonsocial = b.razonsocial;
    dts.ruc         = b.ruc;
    dts.telefono    = b.telefono;
    dts.direccion   = b.direccion;
    await func.insertar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/proveedores/:id', requireAuth, async (req, res) => {
  try {
    const func = new N_Proveedor();
    const dts  = new M_Proveedor();
    const b = req.body;
    dts.idprovedor  = req.params.id;
    dts.razonsocial = b.razonsocial;
    dts.ruc         = b.ruc;
    dts.telefono    = b.telefono;
    dts.direccion   = b.direccion;
    await func.editar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/proveedores/:id', requireAuth, async (req, res) => {
  try {
    const dts = new M_Proveedor();
    dts.idprovedor = req.params.id;
    await new N_Proveedor().eliminar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══════════════════════ CLIENTES ════════════════════════════════════════════
app.get('/api/clientes', requireAuth, async (req, res) => {
  try {
    res.json(await new N_Cliente().mostrar(req.query.buscar || ''));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/clientes', requireAuth, async (req, res) => {
  try {
    const func = new N_Cliente();
    const dts  = new M_Cliente();
    const b = req.body;
    dts.codigo    = b.codigo;
    dts.apellidos = b.apellidos;
    dts.nombres   = b.nombres;
    dts.dni       = b.dni;
    dts.ruc       = b.ruc;
    dts.edad      = b.edad;
    dts.sexo      = b.sexo;
    dts.telefono  = b.telefono;
    dts.direccion = b.direccion;
    await func.insertar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/clientes/:id', requireAuth, async (req, res) => {
  try {
    const func = new N_Cliente();
    const dts  = new M_Cliente();
    const b = req.body;
    dts.codigo    = req.params.id;
    dts.apellidos = b.apellidos;
    dts.nombres   = b.nombres;
    dts.dni       = b.dni;
    dts.ruc       = b.ruc;
    dts.edad      = b.edad;
    dts.sexo      = b.sexo;
    dts.telefono  = b.telefono;
    dts.direccion = b.direccion;
    await func.editar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/clientes/:id', requireAuth, async (req, res) => {
  try {
    const dts = new M_Cliente();
    dts.codigo = req.params.id;
    await new N_Cliente().eliminar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══════════════════════ EMPLEADOS ═══════════════════════════════════════════
app.get('/api/empleados', requireAuth, async (req, res) => {
  try {
    res.json(await new N_Empleado().mostrar(req.query.buscar || ''));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/empleados', requireAuth, async (req, res) => {
  try {
    const func = new N_Empleado();
    const dts  = new M_Empleado();
    const b = req.body;
    dts.idempleado = b.idempleado;
    dts.nombre     = b.nombre;
    dts.apellidos  = b.apellidos;
    dts.dni        = b.dni;
    dts.telefono   = b.telefono;
    dts.direccion  = b.direccion;
    await func.insertar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/empleados/:id', requireAuth, async (req, res) => {
  try {
    const func = new N_Empleado();
    const dts  = new M_Empleado();
    const b = req.body;
    dts.idempleado = req.params.id;
    dts.nombre     = b.nombre;
    dts.apellidos  = b.apellidos;
    dts.dni        = b.dni;
    dts.telefono   = b.telefono;
    dts.direccion  = b.direccion;
    await func.editar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/empleados/:id', requireAuth, async (req, res) => {
  try {
    const dts = new M_Empleado();
    dts.idempleado = req.params.id;
    await new N_Empleado().eliminar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══════════════════════ USUARIOS ════════════════════════════════════════════
app.get('/api/usuarios', requireAuth, async (req, res) => {
  try {
    res.json(await new N_Usuario().mostrar(req.query.buscar || ''));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/usuarios', requireAuth, async (req, res) => {
  try {
    const func = new N_Usuario();
    const dts  = new M_Usuario();
    const b = req.body;
    dts.idempleado = b.idempleado;
    dts.usuario    = b.usuario;
    dts.password   = b.password;
    dts.acceso     = b.acceso;
    dts.estado     = b.estado;
    await func.insertar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/usuarios/:id', requireAuth, async (req, res) => {
  try {
    const func = new N_Usuario();
    const dts  = new M_Usuario();
    const b = req.body;
    dts.idusuario  = req.params.id;
    dts.idempleado = b.idempleado;
    dts.usuario    = b.usuario;
    dts.password   = b.password;
    dts.acceso     = b.acceso;
    dts.estado     = b.estado;
    await func.editar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/usuarios/:id', requireAuth, async (req, res) => {
  try {
    const dts = new M_Usuario();
    dts.idusuario = req.params.id;
    await new N_Usuario().eliminar(dts);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══════════════════════ COMPRAS ═════════════════════════════════════════════
app.get('/api/compras', requireAuth, async (req, res) => {
  try {
    res.json(await new N_Compra().mostrar(req.query.buscar || ''));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/compras', requireAuth, async (req, res) => {
  try {
    const func = new N_Compra();
    const b = req.body;
    // Crear objeto M_Compra con setters
    const compra = new M_Compra();
    compra.fecha          = b.fecha;
    compra.hora           = b.hora;
    compra.num_documento  = b.num_documento;
    compra.tipo_documento = b.tipo_documento;
    compra.subtotal       = b.subtotal;
    compra.igv            = b.igv;
    compra.total          = b.total;
    compra.estado         = b.estado;
    compra.idusuario      = b.idusuario;
    compra.idproveedor    = b.idproveedor;

    const idcompra = await func.registrar(compra, b.detalles);
    res.json({ ok: true, idcompra });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══════════════════════ VENTAS ══════════════════════════════════════════════
app.get('/api/ventas', requireAuth, async (req, res) => {
  try {
    res.json(await new N_Venta().mostrar(req.query.buscar || ''));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/ventas', requireAuth, async (req, res) => {
  try {
    const func = new N_Venta();
    const b = req.body;
    const venta = new M_Venta();
    venta.fecha          = b.fecha;
    venta.hora           = b.hora;
    venta.serie          = b.serie;
    venta.num_documento  = b.num_documento;
    venta.tipo_documento = b.tipo_documento;
    venta.subtotal       = b.subtotal;
    venta.igv            = b.igv;
    venta.total          = b.total;
    venta.estado         = b.estado;
    venta.idusuario      = b.idusuario;
    venta.idcliente      = b.idcliente;

    const idventa = await func.registrar(venta, b.detalles);
    res.json({ ok: true, idventa });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══════════════════════ CONSULTAS ═══════════════════════════════════════════
app.get('/api/consultas/ventas', requireAuth, async (req, res) => {
  try {
    res.json(await new N_Venta().mostrar(req.query.buscar || ''));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/consultas/compras', requireAuth, async (req, res) => {
  try {
    res.json(await new N_Compra().mostrar(req.query.buscar || ''));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══════════════════════ DASHBOARD ═══════════════════════════════════════════
app.get('/api/dashboard', requireAuth, async (req, res) => {
  try {
    const pool = Conexion.conectar();
    const [productos, clientes, ventas, compras] = await Promise.all([
      pool.query('SELECT COUNT(*) as total FROM productos'),
      pool.query('SELECT COUNT(*) as total FROM clientes'),
      pool.query('SELECT COUNT(*) as total FROM ventas'),
      pool.query('SELECT COUNT(*) as total FROM compras'),
    ]);
    res.json({
      productos: productos.rows[0].total,
      clientes:  clientes.rows[0].total,
      ventas:    ventas.rows[0].total,
      compras:   compras.rows[0].total,
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── SPA fallback ──────────────────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Plaza Vea - Sistema de Boletas corriendo en http://localhost:${PORT}`);
  console.log(`   Arquitectura POO: Conexion (Singleton) → BaseDAO → N_* → M_*`);
});

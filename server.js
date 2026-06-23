/**
 * CapaPresentacion - server.js
 * POO: Encapsulamiento (M_), Herencia (N_ extends BaseDAO), Singleton (Conexion), Composicion (N_Compra usa N_Producto)
 */
const express = require('express');
const session = require('express-session');
const cors    = require('cors');
const path    = require('path');

const N_Usuario   = require('./src/CapaLogica/N_Usuario');
const N_Categoria = require('./src/CapaLogica/N_Categoria');
const N_Producto  = require('./src/CapaLogica/N_Producto');
const N_Proveedor = require('./src/CapaLogica/N_Proveedor');
const N_Cliente   = require('./src/CapaLogica/N_Cliente');
const N_Empleado  = require('./src/CapaLogica/N_Empleado');
const N_Compra    = require('./src/CapaLogica/N_Compra');
const N_Venta     = require('./src/CapaLogica/N_Venta');

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

function requireAuth(req, res, next) {
  if (req.session?.user) return next();
  res.status(401).json({ error: 'No autenticado' });
}

// ═══ AUTH ════════════════════════════════════════════════════════════════════
app.post('/api/login', async (req, res) => {
  try {
    const rows = await new N_Usuario().logeo(req.body.usuario, req.body.password);
    if (rows.length > 0) {
      req.session.user = rows[0];
      res.json({ ok: true, user: rows[0] });
    } else {
      res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/logout', (req, res) => { req.session.destroy(() => res.json({ ok: true })); });
app.get('/api/me', requireAuth, (req, res) => res.json(req.session.user));

// ═══ CATEGORIAS ══════════════════════════════════════════════════════════════
// tabla: categoria | columnas: idcategoria, descripcion
app.get('/api/categorias', requireAuth, async (req, res) => {
  try {
    let data = await new N_Categoria().mostrar();
    const q = (req.query.buscar || '').toLowerCase();
    if (q) data = data.filter(r => r.descripcion?.toLowerCase().includes(q));
    res.json(data);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/categorias', requireAuth, async (req, res) => {
  try {
    const dts = new M_Categoria();
    dts.descripcion = req.body.descripcion;
    await new N_Categoria().insertar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/categorias/:id', requireAuth, async (req, res) => {
  try {
    const dts = new M_Categoria();
    dts.idcategoria = req.params.id;
    dts.descripcion = req.body.descripcion;
    await new N_Categoria().editar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/categorias/:id', requireAuth, async (req, res) => {
  try {
    const dts = new M_Categoria();
    dts.idcategoria = req.params.id;
    await new N_Categoria().eliminar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ═══ PRODUCTOS ═══════════════════════════════════════════════════════════════
// tabla: productos | columnas: idproducto,serie,nombre,f_ingreso,f_vencimiento,prec_compra,prec_venta,cantidad,idcategoria
app.get('/api/productos', requireAuth, async (req, res) => {
  try {
    res.json(await new N_Producto().mostrar(req.query.buscar || ''));
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/productos', requireAuth, async (req, res) => {
  try {
    const b = req.body;
    const dts = new M_Producto();
    dts.idproducto    = b.idproducto;
    dts.serie         = b.serie;
    dts.nombre        = b.nombre;
    dts.f_ingreso     = b.f_ingreso;
    dts.f_vencimiento = b.f_vencimiento;
    dts.prec_compra   = b.prec_compra;
    dts.prec_venta    = b.prec_venta;
    dts.idcategoria   = b.idcategoria;
    await new N_Producto().insertar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/productos/:id', requireAuth, async (req, res) => {
  try {
    const b = req.body;
    const dts = new M_Producto();
    dts.idproducto    = req.params.id;
    dts.serie         = b.serie;
    dts.nombre        = b.nombre;
    dts.f_ingreso     = b.f_ingreso;
    dts.f_vencimiento = b.f_vencimiento;
    dts.prec_compra   = b.prec_compra;
    dts.prec_venta    = b.prec_venta;
    dts.idcategoria   = b.idcategoria;
    await new N_Producto().editar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/productos/:id', requireAuth, async (req, res) => {
  try {
    const dts = new M_Producto();
    dts.idproducto = req.params.id;
    await new N_Producto().eliminar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ═══ PROVEEDORES ═════════════════════════════════════════════════════════════
// tabla: proveedor | columnas: idproveedor,razonsocial,ruc,telefono,direccion
app.get('/api/proveedores', requireAuth, async (req, res) => {
  try {
    let data = await new N_Proveedor().mostrar();
    const q = (req.query.buscar || '').toLowerCase();
    if (q) data = data.filter(r =>
      r.razonsocial?.toLowerCase().includes(q) || r.ruc?.includes(q)
    );
    res.json(data);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/proveedores', requireAuth, async (req, res) => {
  try {
    const b = req.body;
    const dts = new M_Proveedor();
    dts.idproveedor = b.idproveedor;
    dts.razonsocial = b.razonsocial;
    dts.ruc         = b.ruc;
    dts.telefono    = b.telefono;
    dts.direccion   = b.direccion;
    await new N_Proveedor().insertar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/proveedores/:id', requireAuth, async (req, res) => {
  try {
    const b = req.body;
    const dts = new M_Proveedor();
    dts.idproveedor = req.params.id;
    dts.razonsocial = b.razonsocial;
    dts.ruc         = b.ruc;
    dts.telefono    = b.telefono;
    dts.direccion   = b.direccion;
    await new N_Proveedor().editar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/proveedores/:id', requireAuth, async (req, res) => {
  try {
    const dts = new M_Proveedor();
    dts.idproveedor = req.params.id;
    await new N_Proveedor().eliminar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ═══ CLIENTES ════════════════════════════════════════════════════════════════
// tabla: clientes | columnas: idcliente,nombre,apellidos,dni,ruc,edad,sexo,telefono,direccion
app.get('/api/clientes', requireAuth, async (req, res) => {
  try {
    let data = await new N_Cliente().mostrar();
    const q = (req.query.buscar || '').toLowerCase();
    if (q) data = data.filter(r =>
      r.nombre?.toLowerCase().includes(q) || r.apellidos?.toLowerCase().includes(q) ||
      r.dni?.includes(q) || r.idcliente?.toLowerCase().includes(q)
    );
    res.json(data);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/clientes', requireAuth, async (req, res) => {
  try {
    const b = req.body;
    const dts = new M_Cliente();
    dts.idcliente  = b.idcliente;
    dts.nombre     = b.nombre;
    dts.apellidos  = b.apellidos;
    dts.dni        = b.dni;
    dts.ruc        = b.ruc;
    dts.edad       = b.edad;
    dts.sexo       = b.sexo;
    dts.telefono   = b.telefono;
    dts.direccion  = b.direccion;
    await new N_Cliente().insertar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/clientes/:id', requireAuth, async (req, res) => {
  try {
    const b = req.body;
    const dts = new M_Cliente();
    dts.idcliente  = req.params.id;
    dts.nombre     = b.nombre;
    dts.apellidos  = b.apellidos;
    dts.dni        = b.dni;
    dts.ruc        = b.ruc;
    dts.edad       = b.edad;
    dts.sexo       = b.sexo;
    dts.telefono   = b.telefono;
    dts.direccion  = b.direccion;
    await new N_Cliente().editar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/clientes/:id', requireAuth, async (req, res) => {
  try {
    const dts = new M_Cliente();
    dts.idcliente = req.params.id;
    await new N_Cliente().eliminar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ═══ EMPLEADOS ═══════════════════════════════════════════════════════════════
// tabla: empleados | columnas: idempleado,nombre,apellidos,dni,telefono,direccion
app.get('/api/empleados', requireAuth, async (req, res) => {
  try {
    let data = await new N_Empleado().mostrar();
    const q = (req.query.buscar || '').toLowerCase();
    if (q) data = data.filter(r =>
      r.nombre?.toLowerCase().includes(q) || r.apellidos?.toLowerCase().includes(q) || r.dni?.includes(q)
    );
    res.json(data);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/empleados', requireAuth, async (req, res) => {
  try {
    const b = req.body;
    const dts = new M_Empleado();
    dts.idempleado = b.idempleado;
    dts.nombre     = b.nombre;
    dts.apellidos  = b.apellidos;
    dts.dni        = b.dni;
    dts.telefono   = b.telefono;
    dts.direccion  = b.direccion;
    await new N_Empleado().insertar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/empleados/:id', requireAuth, async (req, res) => {
  try {
    const b = req.body;
    const dts = new M_Empleado();
    dts.idempleado = req.params.id;
    dts.nombre     = b.nombre;
    dts.apellidos  = b.apellidos;
    dts.dni        = b.dni;
    dts.telefono   = b.telefono;
    dts.direccion  = b.direccion;
    await new N_Empleado().editar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/empleados/:id', requireAuth, async (req, res) => {
  try {
    const dts = new M_Empleado();
    dts.idempleado = req.params.id;
    await new N_Empleado().eliminar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ═══ USUARIOS ════════════════════════════════════════════════════════════════
// tabla: usuarios | columnas: idusuario,idempleado,usuario,pass,acceso,estado
app.get('/api/usuarios', requireAuth, async (req, res) => {
  try {
    res.json(await new N_Usuario().mostrar(req.query.buscar || ''));
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/usuarios', requireAuth, async (req, res) => {
  try {
    const b = req.body;
    const dts = new M_Usuario();
    dts.idempleado = b.idempleado;
    dts.usuario    = b.usuario;
    dts.pass       = b.pass;
    dts.acceso     = b.acceso;
    dts.estado     = b.estado;
    await new N_Usuario().insertar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/usuarios/:id', requireAuth, async (req, res) => {
  try {
    const b = req.body;
    const dts = new M_Usuario();
    dts.idempleado = b.idempleado;
    dts.usuario    = b.usuario;
    dts.pass       = b.pass;
    dts.acceso     = b.acceso;
    dts.estado     = b.estado;
    await new N_Usuario().editar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/usuarios/:id', requireAuth, async (req, res) => {
  try {
    const dts = new M_Usuario();
    dts.idusuario = req.params.id;
    await new N_Usuario().eliminar(dts);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ═══ COMPRAS ═════════════════════════════════════════════════════════════════
app.get('/api/compras', requireAuth, async (req, res) => {
  try {
    res.json(await new N_Compra().mostrar());
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/compras', requireAuth, async (req, res) => {
  try {
    const b = req.body;
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
    const idcompra = await new N_Compra().registrar(compra, b.detalles || []);
    res.json({ ok: true, idcompra });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ═══ VENTAS ══════════════════════════════════════════════════════════════════
app.get('/api/ventas', requireAuth, async (req, res) => {
  try {
    res.json(await new N_Venta().mostrar());
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/ventas', requireAuth, async (req, res) => {
  try {
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
    const idventa = await new N_Venta().registrar(venta, b.detalles || []);
    res.json({ ok: true, idventa });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ═══ CONSULTAS ═══════════════════════════════════════════════════════════════
app.get('/api/consultas/ventas', requireAuth, async (req, res) => {
  try { res.json(await new N_Venta().mostrar()); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/consultas/compras', requireAuth, async (req, res) => {
  try { res.json(await new N_Compra().mostrar()); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

app.listen(PORT, () => console.log(`Plaza Vea servidor en puerto ${PORT}`));

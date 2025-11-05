const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

// CORS
app.use(cors({
  origin: "https://ea-mxshop.vercel.app"
}));
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) console.error("❌ Error al conectar MySQL:", err);
  else console.log("✅ Conectado a MySQL");
});

// ✅ Ruta raíz (muy importante)
app.get("/", (req, res) => {
  res.send("✅ API de EA MXShop funcionando correctamente");
});

// 🧢 Productos
app.get("/productos", (req, res) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) return res.status(500).json({ ok: false, error: err.message });
    res.json(results);
  });
});

// 📬 Contacto
app.post("/contacto", (req, res) => {
  const { nombre, correo, mensaje } = req.body;
  const sql = "INSERT INTO contacto (nombre, correo, mensaje) VALUES (?, ?, ?)";
  db.query(sql, [nombre, correo, mensaje], (err) => {
    if (err) return res.status(500).json({ ok: false, error: err.message });
    res.json({ ok: true });
  });
});

// 🧾 Pedidos
app.post("/pedidos", (req, res) => {
  const { nombre, correo, telefono, direccion, total, items, numeroOrden } = req.body;
  const sqlPedido = "INSERT INTO pedidos (numero_orden, nombre, correo, telefono, direccion, total) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sqlPedido, [numeroOrden, nombre, correo, telefono, direccion, total], (err, result) => {
    if (err) return res.status(500).json({ ok: false, error: err.message });

    const pedidoId = result.insertId;
    const sqlDetalle = "INSERT INTO detalle_pedido (pedido_id, producto_nombre, precio) VALUES ?";
    const values = items.map(i => [pedidoId, i.nombre, i.precio]);

    db.query(sqlDetalle, [values], (err2) => {
      if (err2) return res.status(500).json({ ok: false, error: err2.message });
      res.json({ ok: true, numeroOrden });
    });
  });
});

// 🔥 Puerto dinámico (Render necesita esto)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));

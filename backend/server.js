const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(express.json());

//Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql123",
  database: "ea_mxshop"
});

db.connect(err => {
  if(err) console.error("Error MySQL:", err);
  else console.log("Conectado a MySQL");
});

//Contacto
app.post("/contacto", (req, res) => {
  const { nombre, correo, mensaje } = req.body;
  const sql = "INSERT INTO contacto (nombre, correo, mensaje) VALUES (?, ?, ?)";
  db.query(sql, [nombre, correo, mensaje], (err, result) => {
    if(err) return res.json({ ok:false, error: err.message });
    res.json({ ok:true });
  });
});

//Pedidos
app.post("/pedidos", (req, res) => {
  const { nombre, correo, telefono, direccion, total, items, numeroOrden } = req.body;
  const sqlPedido = "INSERT INTO pedidos (numero_orden, nombre, correo, telefono, direccion, total) VALUES (?, ?, ?, ?, ?, ?)";
  
  db.query(sqlPedido, [numeroOrden, nombre, correo, telefono, direccion, total], (err, result) => {
    if(err) return res.json({ ok:false, error: err.message });
    
    const pedidoId = result.insertId;
    const sqlDetalle = "INSERT INTO detalle_pedido (pedido_id, producto_nombre, precio) VALUES ?";
    const values = items.map(i => [pedidoId, i.nombre, i.precio]);
    
    db.query(sqlDetalle, [values], (err2) => {
      if(err2) return res.json({ ok:false, error: err2.message });
      res.json({ ok:true });
    });
  });
});

// 🛍 Obtener productos
app.get("/productos", (req, res) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if(err) return res.json({ ok:false, error: err.message });
    res.json(results);
  });
});


app.listen(4000, () => console.log("Servidor en http://localhost:4000"));

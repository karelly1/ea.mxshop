CREATE DATABASE IF NOT EXISTS ea_mxshop;
USE ea_mxshop;

-- 📦 Productos
CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0
);

-- 🧾 Pedidos
CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero_orden VARCHAR(20) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100),
  telefono VARCHAR(20),
  direccion TEXT,
  total DECIMAL(10,2),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🧩 Detalle de cada producto dentro de un pedido
CREATE TABLE detalle_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT,
  producto_nombre VARCHAR(100),
  precio DECIMAL(10,2),
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE
);

-- 📬 Contacto
CREATE TABLE contacto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100),
  mensaje TEXT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🧢 Insertar productos iniciales
INSERT INTO productos (nombre, precio, stock) VALUES
('Playera Michael Kors', 580, 5),
(Playera Off White, 580, 3),
('Playera Hellstar', 580, 2),
('Playera Hugo Azul', 580, 1),
('Playera Hellstar', 580, 2),
('Playera Boss' 580, 2),
('Playera Boss Porche', 580, 2);


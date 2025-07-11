const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
// Conexión con la base de datos.
const con = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "",
  database: "farmacia_db"
});
con.connect(err => {
  if (err) throw err;
  console.log("Conectado a la base de datos");
});
// Insertar medicamento
app.post('/medicamentos', (req, res) => {
  console.log('Datos recibidos:', req.body);
  const { nombre, costo, stock } = req.body;
  const sql = "INSERT INTO medicamentos (nombre, costo, stock) VALUES (?, ?, ?)";
  con.query(sql, [nombre, costo, stock], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ mensaje: "Medicamento insertado", id: result.insertId });
  });
});
// Modificar medicamento
app.put('/medicamentos/:id', (req, res) => {
  console.log('Datos recibidos:', req.body);
  const { nombre, costo, stock } = req.body;
  const { id } = req.params;
  const sql = "UPDATE medicamentos SET nombre = ?, costo = ?, stock = ? WHERE id = ?";
  con.query(sql, [nombre, costo, stock, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ mensaje: "Medicamento actualizado" });
  });
});
// Eliminar medicamento
app.delete('/medicamentos/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM medicamentos WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ mensaje: "Medicamento eliminado" });
  });
});
// Obtener medicamento por ID
app.get('/medicamentos/:id', (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM medicamentos WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    result.length > 0
      ? res.json(result[0])
      : res.status(404).json({ mensaje: "Medicamento no encontrado" });
  });
});
app.get('/medicamentos', (req, res) => {
  const sql = "SELECT * FROM medicamentos";
  con.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});
app.listen(port, () => {console.log(`Servidor escuchando en http://localhost:${port}`);});
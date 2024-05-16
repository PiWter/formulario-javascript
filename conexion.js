const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/script.js", function(req,res){
    res.sendFile(__dirname + "/script.js");
});

app.get("/estilos.css", function(req,res){
    res.sendFile(__dirname + "/estilos.css");
});

app.get("/jquery-3.7.1.min.js", function(req,res){
    res.sendFile(__dirname + "/jquery-3.7.1.min.js");
});

app.post('/guardarDatos', (req, res) => {
  const datos = req.body;

  console.log(datos['nombre']);

  const connection = mysql.createConnection({
    server: 'localhost',
    database: 'pub',
    port: '2121',
    user: 'root',
    password: ''
    });

    connection.connect(function(err){
        if(err) {
            throw err;
        } else {
            console.log("Conexión exitosa");
        }
    });

    connection.query("INSERT INTO clientes (Nombre, Apellido, Numero, Correo) VALUES (?, ?, ?, ?)", [datos['nombre'], datos['apellido'], datos['numero'], datos['correo']]);

    connection.query("SELECT Nombre FROM clientes WHERE Nombre = ?", datos['nombre'], function(error, lista){
        if(error){
            throw error;
        } else {
            console.log(lista);
        }
    });

    res.send("Datos recibidos correctamente")
});

app.listen(3000, () => {
  console.log(`Servidor escuchando en http://localhost:3000`);
});
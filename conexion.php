<?php
$servidor="localhost:2121";
$usuario="root";
$passwd="";
$database="pub";
$conn = new mysqli($servidor,$usuario,$passwd,$database);

if ($conn->connect_error){
    die("Conexion fallida ". $conn->connect_error);
}


$cliente=json_decode(file_get_contents("php://input"), true);
if ($cliente){
    $sql="INSERT INTO clientes (Nombre, Apellido, Numero, Correo) VALUES('$cliente[nombre]', '$cliente[apellido]', '$cliente[numero]', '$cliente[correo]')";
    $conn->query($sql);
    echo "Datos escritos en la base de datos";
}
$conn->close();
?>
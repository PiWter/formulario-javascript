let cliente = [];
const soloNumeros = /^[0-9]*$/;
const soloLetras = /^[A-z]*$/;
const validarCorreo = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
let nombreIncorrecto = $("#nombre-incorrecto");
let apellidoIncorrecto = $("#apellido-incorrecto");
let numeroIncorrecto = $("#numero-incorrecto");
let correoIncorrecto = $("#correo-incorrecto");

/*document.getElementById("nombre").addEventListener('input', function(){
    nombreIncorrecto.style.display = 'none'
});*/

$( "#nombre" ).on( "input", function() {
    nombreIncorrecto.hide();
});

$( "#apellido" ).on( "input", function() {
    apellidoIncorrecto.hide();
});

$( "#numero" ).on( "input", function() {
    numeroIncorrecto.hide();
});

$( "#correo" ).on( "input", function() {
    correoIncorrecto.hide();
});


function AñadirUsuario() {

    //let nombre = document.getElementById("nombre").value;

    let nombre = $("#nombre").val();
    ComprobarNombre(nombre);
    let apellido = $("#apellido").val();
    ComprobarApellido(apellido);
    let numero = $("#numero").val();
    ComprobarNumero(numero)
    let correo = $("#correo").val();
    ComprobarCorreo(correo)

    if (cliente.length == 4) {
        console.log("Datos correctos, guardando...");

        ///////////////obtener los datos del formulario

        datos = {};
        $('input').each(function () {
         datos[this.name] = this.value;
        });

        insertar(datos);

        /*
        const formulario = new FormData(formulario);
        const datos = Object.fromEntries(formulario.entries());
        console.log(JSON.stringify(datos));*/

        ////////////////////////////////borrar el formulario
        formulario.reset();

        //document.getElementById("nombre").value="";

        /*$("#nombre").val("");
        $("#apellido").val("");
        $("#numero").val("");
        $("#correo").val("");*/
    }

    cliente = [];
}


function ComprobarNombre(nombre) {
    if (nombre.length > 0 &  soloLetras.test(nombre)) {
        cliente.push({ nombre });
    } else {
        $(nombreIncorrecto.show());
    }
}

function ComprobarApellido(apellido) {
    if (apellido.length > 0 & soloLetras.test(apellido)) {
        cliente.push({ apellido });
    } else {
        $(apellidoIncorrecto.show());
    }
}

function ComprobarNumero(numero) {
    if (numero.length == 9 & soloNumeros.test(numero)) {                       
        cliente.push({ numero });
    } else {
        $(numeroIncorrecto.show());
    }
}

function ComprobarCorreo(correo) {
    if (correo.length > 0 & validarCorreo.test(correo)) {
        cliente.push({ correo });
    } else {
        $(correoIncorrecto.show());
    }
}

function insertar(datos) {
    console.log("Conectando con el servidor...");
    fetch("http://localhost:3000/guardarDatos",{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(datos)
    })
    .catch(error => {
        console.error("Error al conectar con el servidor: ", error);
    })
}
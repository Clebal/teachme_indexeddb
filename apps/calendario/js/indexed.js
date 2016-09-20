// JavaScript Document

var bd;

function iniciar() {

    boton_agregar = document.getElementById("boton_agregar"); 
    boton_editar = document.getElementById("boton_editar"); 

    boton_agregar.addEventListener("click", agregarExamen, false);
    boton_editar.addEventListener("click", editarExamen1, false);

    solicitud = indexedDB.open("olaya");

    solicitud.onsuccess = function(e) {

        bd = e.target.result;

    }

    solicitud.onupgradeneeded = function(e) {

        bd = e.target.result;
        bd.createObjectStore("nota", {keyPath: "id", autoIncrement: true});	
        bd.createObjectStore("calendario", {keyPath: "id", autoIncrement: true});
        bd.createObjectStore("anotaciones", {keyPath: "id", autoIncrement: true});
        bd.createObjectStore("usuario", {keyPath: "id", autoIncrement: true});
        bd.createObjectStore("horario", {keyPath: "id", autoIncrement: true});

    }

    solicitud.addEventListener("success", mostrarExamen, false);
    solicitud.addEventListener("success", mostrarNombre, false);

}

function agregarExamen() {

    var asignatura = document.getElementById("asignatura_agregar").value;
    var fecha = document.getElementById("fecha_agregar").value;

    if(asignatura == null || fecha == null || asignatura == "" || fecha == ""){

        alert("Por favor, introduzca algún dato ;)");

    }else{

        var transaccion = bd.transaction(["calendario"], "readwrite");

        var almacen = transaccion.objectStore("calendario");

        var agregar = almacen.add({asignatura: asignatura, fecha: fecha});

        agregar.onsuccess = function(e){

            mostrarExamen();

        }

    }

}

// *---------- MOSTRAR ----------*


function mostrarExamen() {

    calendario = document.getElementById("calendario");

    calendario.innerHTML = "";

    var transaccion = bd.transaction(["calendario"], "readonly");

    var almacen = transaccion.objectStore("calendario");

    var cursor = almacen.openCursor();

    cursor.addEventListener("success", mostrarExamen2, false);	

}

function mostrarExamen2(e) {

    var cursor = e.target.result;

    if(cursor){

        id = cursor.value.id;
        fecha = cursor.value.fecha;
        asignatura = cursor.value.asignatura;

        calendario.innerHTML += "<br><div class='caja center-block panel panel-primary' style='color: black; border-radius: 4px; border: 0px'><div class='panel-heading'><p class='caja_asignatura'>" + asignatura + "</p></div><div class='panel-body text-center'><p style='font-size: 30px; margin-bottom: -5px;'>" + fecha + "</div><div class='caja_eliminar' onclick='eliminarExamen("+id+")'>X</div> <div class='caja_editar' onclick='editarExamen1("+id+")'>Editar</div></div>";

        cursor.continue();	

    }

    var nouEvent = document.createEvent("MouseEvents");
    nouEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var objecte = document.getElementById("agregar_close");
    var canceled = !objecte.dispatchEvent(nouEvent);

}

// *---------- ELIMINAR ----------*


function eliminarExamen(id) {

    var transaccion = bd.transaction(["calendario"], "readwrite");

    var almacen = transaccion.objectStore("calendario");

    var borrar = almacen.delete(id);

    borrar.onsuccess = function(e){

        mostrarExamen();

    }

}

// *---------- EDITAR ----------*


function editarExamen1(id) {



    var transaccion = bd.transaction(["calendario"], "readwrite");

    var almacen = transaccion.objectStore("calendario");

    var borrar = almacen.delete(id);

    borrar.onsuccess = function(e){

        var asignatura = prompt("¿De qué asignatura tiene examen?","Matemáticas");
        var fecha = prompt("¿Qué día?","02-12-2015");

        if(asignatura == null || fecha == null || asignatura == "" || fecha == ""){

            alert("Por favor, introduzca algún dato ;)");

        }else{

            editarExamen2(id, asignatura, fecha);

        }

    }

}


function editarExamen2(id, asignatura, fecha) {

    var transaccion = bd.transaction(["calendario"], "readwrite");

    var almacen = transaccion.objectStore("calendario");

    var agregar = almacen.add({id: id, asignatura: asignatura, fecha: fecha});

    agregar.onsuccess = function(e){

        mostrarExamen();

    }

}

/* --------- MOSTRAR NOMBRE --------*/

function mostrarNombre() {

    nombre = document.getElementById("nombre");

    nombre.innerHTML = "";

    var transaccion = bd.transaction(["usuario"], "readonly");

    var almacen = transaccion.objectStore("usuario");

    var cursor = almacen.openCursor();

    cursor.addEventListener("success", mostrarNombre2, false);	

}

function mostrarNombre2(e) {

    var cursor = e.target.result;

    if(cursor){

        id = cursor.value.id;
        nombre_valor = cursor.value.nombre;

        nombre.innerHTML+= nombre_valor;

        cursor.continue();	

    }

}


// Cuando se termine de cargar la página se iniciará
// la función iniciar

window.addEventListener("load", iniciar, false);
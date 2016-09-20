// JavaScript Document

var bd;

function iniciar() {

    boton_anotacion = document.getElementById("boton_anotacion"); 

    boton_anotacion.addEventListener("click", agregarAnotacion, false);

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

    solicitud.addEventListener("success", mostrarAnotacion, false);
    solicitud.addEventListener("success", mostrarNombre, false);

}

function agregarAnotacion() {

    var nota = prompt("Escriba lo que quiera anotar");

    if(nota == null || nota == ""){

        alert("No lo dejes en blanco ;)");

    }else{

        var transaccion = bd.transaction(["anotaciones"], "readwrite");

        var almacen = transaccion.objectStore("anotaciones");

        var agregar = almacen.add({descripcion: nota});

        agregar.onsuccess = function(e){

            mostrarAnotacion();

        }

    }

}

// *---------- MOSTRAR ----------*


function mostrarAnotacion() {

    anotacion = document.getElementById("anotaciones");

    anotacion.innerHTML = "";

    var transaccion = bd.transaction(["anotaciones"], "readonly");

    var almacen = transaccion.objectStore("anotaciones");

    var cursor = almacen.openCursor();

    cursor.addEventListener("success", mostrarAnotacion2, false);	

}

function mostrarAnotacion2(e) {

    var cursor = e.target.result;

    if(cursor){

        id = cursor.value.id;
        descripcion = cursor.value.descripcion;

        anotacion.innerHTML+= "<br><div class='caja center-block' style='color: black;'><p class='caja_nota' style='padding: 5px; margin-bottom: 0px;'>" + descripcion + "<div class='caja_eliminar' onclick='eliminarAnotacion("+id+")'>X</div> <div class='caja_editar' onclick='editarAnotacion1("+id+")'>Editar</div></div>";

        cursor.continue();	

    }

}

// *---------- ELIMINAR ----------*


function eliminarAnotacion(id) {

    var transaccion = bd.transaction(["anotaciones"], "readwrite");

    var almacen = transaccion.objectStore("anotaciones");

    var borrar = almacen.delete(id);

    borrar.onsuccess = function(e){

        mostrarAnotacion();

    }

}

// *---------- EDITAR ----------*


function editarAnotacion1(id) {

    var transaccion = bd.transaction(["anotaciones"], "readwrite");

    var almacen = transaccion.objectStore("anotaciones");

    var borrar = almacen.delete(id);

    borrar.onsuccess = function(e){

        var descripcion = prompt("Anota lo que quieras ;)");

        if(descripcion == null || descripcion == ""){

            alert("No lo dejes en blanco ;)");

        }else{

            editarAnotacion2(id, descripcion);

        }

    }

}

function editarAnotacion2(id, descripcion) {

    var transaccion = bd.transaction(["anotaciones"], "readwrite");

    var almacen = transaccion.objectStore("anotaciones");

    var agregar = almacen.add({id: id, descripcion: descripcion});

    agregar.onsuccess = function(e){

        mostrarAnotacion();

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
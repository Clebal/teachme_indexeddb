// JavaScript Document

var bd;

function iniciar() {

    boton_agregar = document.getElementById("boton_agregar"); 

    boton_agregar.addEventListener("click", agregarHora, false);

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

    solicitud.addEventListener("success", mostrarHora, false);
    solicitud.addEventListener("success", mostrarNombre, false);

}

function agregarHora() {

    var asignatura = document.getElementById("asignatura").value;
    var hora = document.getElementById("hora").value;
    var dia = document.getElementById("dia").value;

    if(asignatura == null || dia == null || hora == null || asignatura == "" || dia == "" || hora == ""){

        alert("Por favor, introduzca algún dato ;)");

    }else{

        var transaccion = bd.transaction(["horario"], "readwrite");

        var almacen = transaccion.objectStore("horario");

        var agregar = almacen.add({asignatura: asignatura, hora: hora, dia: dia});

        agregar.onsuccess = function(e){

            mostrarHora();

            document.getElementById("asignatura").value = "";
            document.getElementById("hora").value = "";
            document.getElementById("dia").value = "";

        }

    }

}

// *---------- MOSTRAR ----------*


function mostrarHora() {

    horario = document.getElementById("horario");

    horario.innerHTML = "";

    var transaccion = bd.transaction(["horario"], "readonly");

    var almacen = transaccion.objectStore("horario");

    var cursor = almacen.openCursor();

    cursor.addEventListener("success", mostrarHora2, false);	

}

function mostrarHora2(e) {

    var cursor = e.target.result;

    if(cursor){

        id = cursor.value.id;
        hora = cursor.value.hora;
        asignatura = cursor.value.asignatura;
        dia = cursor.value.dia;

        horario.innerHTML+= "<br><div class='caja center-block panel panel-primary' style='color: black; border-radius: 4px; border: 0px'><div class='panel-heading'><p class='caja_asignatura'>" + dia + " - " + hora + "</p></div><div class='panel-body text-center'><p style='font-size: 30px; margin-bottom: -5px;'>" + asignatura + "</div><div class='caja_eliminar' onclick='eliminarHora("+id+")'>X</div> <div class='caja_editar' onclick='editarHora1("+id+")'>Editar</div></div>";

        cursor.continue();	

    }

    var nouEvent = document.createEvent("MouseEvents");
    nouEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var objecte = document.getElementById("agregar_close");
    var canceled = !objecte.dispatchEvent(nouEvent);

}

// *---------- ELIMINAR ----------*


function eliminarHora(id) {

    var transaccion = bd.transaction(["horario"], "readwrite");

    var almacen = transaccion.objectStore("horario");

    var borrar = almacen.delete(id);

    borrar.onsuccess = function(e){

        mostrarHora();

    }

}

// *---------- EDITAR ----------*


function editarHora1(id) {

    var transaccion = bd.transaction(["horario"], "readwrite");

    var almacen = transaccion.objectStore("horario");

    var borrar = almacen.delete(id);

    borrar.onsuccess = function(e){

        var asignatura = prompt("Introduce la asignatura correcta", "Matemáticas");
        var hora = prompt("Introduce la hora correcta", "11:30");
        var dia = prompt("Introduce la día correcta", "Lunes");

        editarHora2(id, asignatura, hora, dia);

    }

}

function editarHora2(id, asignatura, hora, dia) {

    var transaccion = bd.transaction(["horario"], "readwrite");

    var almacen = transaccion.objectStore("horario");

    var agregar = almacen.add({id: id, asignatura: asignatura, hora: hora, dia: dia});

    agregar.onsuccess = function(e){

        mostrarHora();

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
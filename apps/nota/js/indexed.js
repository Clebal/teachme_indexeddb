// JavaScript Document

var bd;

function iniciar() {

    boton_nota = document.getElementById("boton_nota"); 

    boton_nota.addEventListener("click", agregarNota, false);

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

    solicitud.addEventListener("success", mostrarNota, false);
    solicitud.addEventListener("success", mostrarNombre, false);

}

function agregarNota() {

    var asignatura = prompt("Introduce la asignatura");

    var nota = prompt("Introduce la nota");

    if(asignatura == null || nota == null || asignatura == "" || nota == ""){

        alert("Por favor, introduzca algún dato ;)");

    }else{


        var transaccion = bd.transaction(["nota"], "readwrite");

        var almacen = transaccion.objectStore("nota");

        var agregar = almacen.add({asignatura: asignatura, nota: nota});

        agregar.onsuccess = function(e){

            mostrarNota();

        }

    }

}


// *---------- MOSTRAR ----------*


function mostrarNota() {

    notas = document.getElementById("notas");

    notas.innerHTML = "";

    var transaccion = bd.transaction(["nota"], "readonly");

    var almacen = transaccion.objectStore("nota");

    var cursor = almacen.openCursor();

    cursor.addEventListener("success", mostrarNota2, false);	

}

function mostrarNota2(e) {

    var cursor = e.target.result;

    if(cursor){

        id = cursor.value.id;
        nota = cursor.value.nota;
        asignatura = cursor.value.asignatura;

        notas.innerHTML+= "<br><div class='caja center-block panel panel-primary' style='color: black; border-radius: 4px; border: 0px'><div class='panel-heading'><p class='caja_asignatura'>" + asignatura + "</p></div><div class='panel-body text-center'><p style='font-size: 30px; margin-bottom: -5px;'>" + nota + "</div><div class='caja_eliminar' onclick='eliminarNota("+id+")'>X</div> <div class='caja_editar' onclick='editarNota1("+id+")'>Editar</div></div>";

        cursor.continue();	

    }

}

// *---------- ELIMINAR ----------*


function eliminarNota(id) {

    var transaccion = bd.transaction(["nota"], "readwrite");

    var almacen = transaccion.objectStore("nota");

    var borrar = almacen.delete(id);

    borrar.onsuccess = function(e){

        mostrarNota();

    }

}

// *---------- EDITAR ----------*


function editarNota1(id) {

    var transaccion = bd.transaction(["nota"], "readwrite");

    var almacen = transaccion.objectStore("nota");

    var borrar = almacen.delete(id);

    borrar.onsuccess = function(e){

        var asignatura = prompt("Introduce la asignatura correcta");
        var nota = prompt("Introduce la nota correcta");

        if(asignatura == null || asignatura == "" || nota == null || nota == ""){

            alert("No lo dejes en blanco ;)");

        }else{


            editarNota2(id, asignatura, nota);

        }

    }

}



function editarNota2(id, asignatura, nota) {

    var transaccion = bd.transaction(["nota"], "readwrite");

    var almacen = transaccion.objectStore("nota");

    var agregar = almacen.add({id: id, asignatura: asignatura, nota: nota});

    agregar.onsuccess = function(e){

        mostrarNota();

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
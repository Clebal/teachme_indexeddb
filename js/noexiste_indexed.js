// JavaScript Document

var bd;

function iniciar() {

    boton_empezar = document.getElementById("boton_empezar")
    
    boton_empezar.addEventListener("click", empezar, false);
    
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

}

function empezar() {

    var asignatura = prompt("Escriba su nombre");

    if(asignatura == null || asignatura == ""){

        alert("Por favor, introduzca algún dato ;)");

    }else{

        var transaccion = bd.transaction(["usuario"], "readwrite");

        var almacen = transaccion.objectStore("usuario");

        var agregar = almacen.add({nombre: asignatura});

        agregar.onsuccess = function(e){

            window.location ="index.html";

        }

    }

}


// Cuando se termine de cargar la página se iniciará
// la función iniciar

window.addEventListener("load", iniciar, false);
// JavaScript Document

var bd;
var num;
var numeros;

function iniciar() {

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

    solicitud.addEventListener("success", comprobar, false);
    solicitud.addEventListener("success", mostrarNombre, false);
}


// COMPROBAR

function comprobar() {

    var transaccion = bd.transaction(["nota"], "readonly");

    var almacen = transaccion.objectStore("nota");

    var cursor = almacen.openCursor();

    cursor.addEventListener("success", comprobar2, false);

}

function comprobar2(e) {

    cursor_nota = e.target.result;

    if(cursor_nota){

        calcularPromedio();

    }else{

    }

}

// *---------- MOSTRAR ----------*


function calcularPromedio() {

    media = document.getElementById("media");

    media.innerHTML = "";

    var transaccion = bd.transaction(["nota"], "readonly");

    var almacen = transaccion.objectStore("nota");

    var cursor = almacen.openCursor();

    cursor.addEventListener("success", calcularPromedio2, false);	

}

function calcularPromedio2(e) {

    var cursor = e.target.result;

    if(cursor){

        num += "." + cursor.value.nota;

        cursor.continue();

    }

    mostrar(num);

}

function mostrar(num){

    var divido = num.split("undefined")

    var divid = divido[1].split(".");

    var r=0; 

    for(var q=1; q<divid.length; q++) 
    { 
        if(typeof(divid[q]) == 'number') 
        {

            r += divid[q];

        }else{

            divid[q] = parseInt(divid[q]);

            r += divid[q];

        }
    } 

    q = q - 1;

    medida = r / q;

    media.innerHTML = '<div class="text-left" style="height: 40px; background: white; margin-top: -10px"><h4 style="line-height: 40px; margin-left: 15px; color: black;">Media: <span id="promedio">'+medida.toFixed(2)+'</span></h4></div> <script src="js/comprobar.js">';


}


// *---------- MOSTRAR ----------*


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
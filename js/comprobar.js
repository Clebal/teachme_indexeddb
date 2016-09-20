function calcularPromedio() {

    promedio = document.getElementById("promedio");

    promedio.innerHTML = "";

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
    
    media = r / q;
    
    promedio.innerHTML = media.toFixed(2);

}

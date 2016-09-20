var player = false;
var canvas = false;
var context = false;
var paused = false;

 
 
 
var pause = function(){
    //Pausamos la reproducción
    player.pause();
    paused = true;
 
    //Escondemos el pause y mostramos el play
    $('#pause').hide(); $('#play').show();
}
 
var play = function(){
    //Iniciamos la reproducción
    player.play();
    paused = false;
 
    //Escondemos el play y mostramos el pause
    $('#play').hide(); $('#pause').show();
}

var init = function(){
    //Inicializamos el player
    player = document.getElementById('player');
 
    //Asociamos eventos a los botones de play y pause
    $('#play').click(play);
    $('#pause').click(pause);

};
 
$(document).ready(function(){
    $('.audio_control').click(function(event){
        event.preventDefault(); //Evitamos que se mueva la ventana al hacer clic en los enlaces
    });
 
    $('#player').bind('loadedmetadata', init); //Lanzamos la función init cuando se hayan cargado los metadatos
 
});
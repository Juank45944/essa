$(document).ready(function() {
    var respuesta = new Array();
    var errores = 1;

    //Creamos los botones con las letras dinamicamente usando codigo ASCII
    for (var i = 65; i < 91; i++) {
        $('#letras').append('<button class="btn btn-tam azul claro" id="letra'+String.fromCharCode(i)+'">'+String.fromCharCode(i)+'</button>');
    };

    //Declaramos nuestras frases que hay que descubrir
    secretas = {
        0:"Ingreso a la oficina",
        1:"Saludo y Atención cordial al cliente",
        2:"La Comunicacion efectiva",
        3:"Tiempo de atencion",
        4:"Uso de la dotacion institucional",
        5:"Comunicacion escrita clara y oportuna",
    };

    //Convertimos todo a mayusculas
    for (var i = 0; i < 6; i++) {
      secretas[i] = secretas[i].toUpperCase();
    };

  //Generamos un numero al azar para elegir una frase
  var azar = Math.floor((Math.random() * 4) + 1);
  for (var i = 0; i < secretas[azar].length; i++) {
    if(secretas[azar].charAt(i) != ' ')respuesta[i] = '_ ';
    else respuesta[i] = '\n'
        $('#secreto').append(respuesta[i]);
  };

//Cada vez que cliquen una letra entra qui
$('.btn-tam').click(function(event) {
    //Sacamos la tecla que se pulso
    var id= this.id.charAt(5);
    var ban = false;
    $('#secreto').empty();
    //Comparamos si la letra que se eligio esta en la frase y se va agregado
    for (var i = 0; i < secretas[azar].length; i++) {
        if(secretas[azar].charAt(i) == id){
            respuesta[i] = id;
            ban = true;
        }
        $('#secreto').append(respuesta[i]);
    };

    //Si la letra no esta en la frase...aumentamos los errores y cambiamos la imagen
    //Si llegas a 5 errores el juego termina
    if(!ban){
        errores++;
        $('#imagen').attr('src', 'img/ahorcado'+errores+'.png');
        if(errores == 5){
            alert(':( Has perdido. El resultado era: '+secretas[azar]);
            location.href="ahoracado.html";
        }
    }
    //Si la letra si esta en la frase entonces checamos si completaste la frase 
    else{
        var ban2 = true;
        for (var i = 0; i < respuesta.length; i++) {
            if(respuesta[i] == '_ '){
                ban2 = false;
                break;
            }
        };
        if(ban2){
            alert('Muy bien! Lo lograste! :)');
            location.href="storyboard.html";

        }
    }
    //Desactivamos la letra que ya se pulso
    $(this).removeClass('btn-tam');
    $(this).attr('disabled','disabled');
});
});


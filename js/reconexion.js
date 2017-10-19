const server = 'http://localhost/essa/server/';

$(function(){
    getUserData();
    bindEvents();
    $('.modal').modal({
        startingTop: '2%',
        endingTop: '3%',
        dismissible: false
    });
})

function getUserData(){
    let url = server+'curso.php';
    $.post(url, {token: sessionStorage.getItem('token')})
        .done(function(res){
            data = JSON.parse(res);
            if(data.err){
                $('.loader-container').addClass('animated slideOutDown');
                $('.loader-container').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).hide();
                });
                swal(
                    'Error',
                    data.err,
                    'error'
                  ).then(function(){
                      window.location.href = "login.html";
                  })
            }else{
                getProgress();
            }
        })
}

function getProgress(){
    let url = server+'inicio.php';
    $.post(url, {nombre_curso: 'Reconexión', token: sessionStorage.getItem('token')})
        .done(function(res){
            let response = JSON.parse(res);
            let etapa = parseInt(response.etapa);
            for (var i = 0; i <= etapa; i++) {
                $('#im'+i.toString()).attr('src', 'img/'+i.toString()+'Gris.png');
                $('#pb'+i.toString()).remove();
                $('#modal'+i.toString()).find('a').css('display', 'block');
            }
            bindEvents();
            for (var i = 6; i > etapa+1; i--) { //TOTAL DE ETAPAS DEL CURSO (MODIFICAR)
                if(i!=0){
                    $('#n'+i.toString()).off('click');
                }
            }
        })
        .then(function(){
            $('.loader-container').addClass('animated slideOutDown');
            $('.loader-container').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).hide();
            });
        })
}

function initModals(){
    
    $('#n0').click(function(){
        $('#modal0').modal('open');
        launchProgressBar('#pb0', 10) //ajustar los tiempos de cada paso en segundos
    })
    $('#n1').click(function(){
        $('#modal1').modal('open');
        launchProgressBar('#pb1', 45)
    })
    $('#n2').click(function(){
        $('#modal2').modal('open');
        launchProgressBar('#pb2', 30)
    })
    $('#n3').click(function(){
        $('#modal3').modal('open');
        launchProgressBar('#pb3', 115)
    })
    $('#n4').click(function(){
        $('#modal4').modal('open');
        launchProgressBar('#pb4', 60)
    })
    $('#n5').click(function(){
        $('#modal5').modal('open');
        launchProgressBar('#pb5', 30)
    })
    $('#n6').click(function(){
        $('#modal6').modal('open');
        launchProgressBar('#pb6', 60)
    })

}
function bindEvents(){
    initModals();
    $('#logout').click(function(){
        logout();
    })
    $('.number').hover(function(){
        $(this).addClass('animated pulse');
    }, function(){
        $(this).removeClass('animated pulse');
    })
    $('#home').click(function(){
        window.location.href = 'inicio.html';
    })
}

function logout(){
    let url = server+'logout.php';
    $.post(url, {token: sessionStorage.getItem('token')})
        .done(function(res){
            let response = JSON.parse(res);
            if(response.msj){
                sessionStorage.clear();
                window.location.href = "login.html";
            }
        })
}

function saveProgress(etapa, id){
    let src = $('#im'+etapa.toString()).attr('src');
    if(src.indexOf('Gris')==-1){
        let url = server+'saveProgress.php';
        $.post(url, {token: sessionStorage.getItem('token'), etapa: etapa, curso: 2}) //En curso se indica el id del curso correspondiente
        .done(function(res){
            let response = JSON.parse(res);
            if(response.err){

            }else{
                imBut = id.replace('pb', 'im');
                $(imBut).attr('src', 'img/'+etapa+'Gris.png');
                $('#pb'+etapa).remove();
                $('#modal'+etapa).find('a').css('display', 'block');
                bindEvents();
                for (let i = 6; i > (parseInt(etapa)+1); i--) { //TOTAL DE ETAPAS DEL CURSO (MODIFICAR)
                    if(i!=0){
                        $('#n'+i.toString()).off('click');
                    }
                }
            }
        })
    }

}

function launchProgressBar(id, time){
    let duration = time*100;
    var pgb = $(id);
    var i = 0;
    pgb.ariaProgressbar({
      progressClass: 'progress'
    });
    var int = setInterval(function() {
        console.log(i);
      if (i < 100) {
        try {
            pgb.ariaProgressbar('update', i+10);
        } catch (error) {
            //console.log('error');
        }
        i = i + 10;
      } else {
        clearInterval(int);
      }
      if (i == 90) {
          $(id).prev().find('a').show();
          if(id.length>4){
              etapa = id.substr(3,2);
          }else etapa = id.substr(3,1);
          saveProgress(etapa, id);
      }
    }, duration);
}
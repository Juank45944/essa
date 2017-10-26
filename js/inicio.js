const server = 'http://localhost/essa/server/';

$(function(){
    getUserData();
})

function getUserData(){
    let url = server+'inicio.php';
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
                insertCursos(data)
            }
        })
}

function insertCursos(cursos){
    cursos.forEach(function(value) {
        $('#lista-cursos').append(`<a href="#!" class="collection-item">${value.nombre}</a>`);
    }, this);
    if(cursos[0].genero == 'M'){
        $('#username').html('Bienvenido '+cursos[0].username);
    }else{
        $('#username').html('Bienvenida '+cursos[0].username);
    }
    bindEvents()
    $('.loader-container').addClass('animated slideOutDown');
    $('.loader-container').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).hide();
    });
}

function bindEvents(){
    $('#lista-cursos a').click(function(){
        $('#lista-cursos a').removeClass('active');
        $(this).addClass('active');
        let selectedCurso = $(this).text();
        getProgress(selectedCurso);
    })
    $('#logout').click(function(){
        logout();
    })
    $('#ingresar-btn').click(function(){
        ingresarACurso();
    })
}

function getProgress(curso){
    //insertar los cajones correspondientes al # de niveles del curso seleccionado en la barra de progreso
    switch (curso) {
        case 'Suspensión':
            $('.barra-progreso').empty();
            $('.barra-progreso').append(`
            <div class="pr inicio"></div>
            <div class="pr primero"></div>
            <div class="pr segundo"></div>
            <div class="pr tercero"></div>
            <div class="pr cuarto"></div>
            <div class="pr quinto"></div>
            <div class="pr sexto"></div>
            <div class="pr septimo"></div>
            <div class="pr octavo"></div>
            <div class="pr noveno"></div>
            <div class="pr decimo"></div>
            <div class="pr once"></div>
            `)
            break;
        case 'Reconexión':
            $('.barra-progreso').empty();
            $('.barra-progreso').append(`
            <div class="pr inicio"></div>
            <div class="pr primero"></div>
            <div class="pr segundo"></div>
            <div class="pr tercero"></div>
            <div class="pr cuarto"></div>
            <div class="pr quinto"></div>
            <div class="pr sexto"></div>
            `)
            break;
        case 'Contact Center':
            $('.barra-progreso').empty();
            $('.barra-progreso').append(`
            <div class="pr inicio"></div>
            <div class="pr primero"></div>
            <div class="pr segundo"></div>
            <div class="pr tercero"></div>
            <div class="pr cuarto"></div>
            <div class="pr quinto"></div>
            <div class="pr sexto"></div>
            <div class="pr septimo"></div>
            <div class="pr octavo"></div>
            <div class="pr noveno"></div>
            <div class="pr decimo"></div>
            `)
            break;
        case 'Comportamiento Presencial':
            $('.barra-progreso').empty();
            $('.barra-progreso').append(`
            <div class="pr inicio"></div>
            <div class="pr primero"></div>
            <div class="pr segundo"></div>
            <div class="pr tercero"></div>
            <div class="pr cuarto"></div>
            <div class="pr quinto"></div>
            <div class="pr sexto"></div>
            <div class="pr septimo"></div>
            <div class="pr octavo"></div>
            <div class="pr noveno"></div>
            <div class="pr decimo"></div>
            `)
            break;
            
    
        default:
            break;
    }

    let url = server+'inicio.php';
    $.post(url, {nombre_curso: curso, token: sessionStorage.getItem('token')})
        .done(function(res){
            let response = JSON.parse(res);
            loadEtapa(response.etapa);
        })
}

function loadEtapa(numero){
    $('.barra-progreso div').removeClass('done');
    $('.barra-progreso div').each(function(index, element){
        if(index<=numero && numero!=-1){
            $(element).addClass('done');
        }
    });
    $('.barra-progreso').show();
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

function ingresarACurso(){
    let selectedCurso = $('#lista-cursos a.active').text();
    switch (selectedCurso) {
        case "Suspensión":
            window.location.href = "suspension.html";
            break;
        case "Reconexión":
            window.location.href = "reconexion.html";
            break;
        case "Contact Center":
            window.location.href = "contact_center.html";
            break;
        case "Comportamiento Presencial":
            window.location.href = "presencial.html";
            break;
        default:
            swal(
                'Atención',
                'Debes seleccionar un curso en la lista de la izquierda para ingresar',
                'info'
            )
            break;
    }
}
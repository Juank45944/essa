const server = 'http://localhost/essa/server/';

$(function(){
    $('.barra-progreso').hide();
    getUserData();
})

function getUserData(){
    let url = server+'inicio.php';
    $.post(url, {token: sessionStorage.getItem('token')})
        .done(function(res){
            data = JSON.parse(res);
            if(data.err){
                alert(data.err);
                window.location.href = "login.html";
            }else{
                insertCursos(data);
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
    bindEvents();
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
}

function getProgress(curso){
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
        if(index<numero){
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
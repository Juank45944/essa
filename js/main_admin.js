const server = 'http://localhost/essa/server/';

//TODO: 
/**
 * cargar dinamicamente lista de checks con usuarios
 * cargar dinamicamente lista de select con cursos
 * enviar nuevo curso y guardar
 * enviar asignar curso a usuarios y guardar
 */

$(function(){
    bindEvents();
    getUserData();
    $('.collapsible').collapsible();
    $('ul.tabs').tabs();
    
})


function bindEvents(){

    $('#enviar_btn').click(function(){
        register();
    })
    $('#usuario-curso-btn').click(function(){
        asignarCursoUsuario();
    })
    
}

function getUserData(){
    let url = server+'admin.php';
    $.post(url, {token: sessionStorage.getItem('token')})
        .done(function(res){
            data = JSON.parse(res);
            if(data.err){
                swal(
                    'Error',
                    data.err,
                    'error'
                  ).then(function(){
                     window.location.href = "admin.html";
                  }) 
            }else{
                loadTables(data);
            }
        })
}

function validateRegister(){
    let nombre = $('#nombre_reg').val();
    let cedula = $('#cedula_reg').val();
    let email = $('#email_reg').val();
    let genero = $("input[name=genero]:checked").val();
    let pwd = $('#password_reg').val();
    let pwd2 = $('#password_repeat').val();

    if(nombre=="" ||cedula=="" ||email=="" ||genero=="" ||pwd=="" ||pwd2==""){
        swal(
            'Error',
            'Ningún campo debe ser vacío',
            'error'
          )
        return null;
    }else if(pwd != pwd2){
        swal(
            'Error',
            'Las contraseñas no coinciden',
            'error'
          )
        return null;
    }else{
        return {
            nombre: nombre,
            cedula: cedula,
            email: email,
            genero: genero,
            pwd: pwd,
            token: sessionStorage.getItem('token')
        }
    }

}

function register(){
    let url = server+'register.php';
    if(validateRegister()){
        let data = validateRegister();
        $.post(url, data)
            .done(function(res){
                let response = JSON.parse(res);
                if(response.err){
                    swal(
                        'Error',
                        response.err,
                        'error'
                      )
                }else{
                    swal(
                        'Éxito',
                        'Usuario añadido correctamente',
                        'success'
                      ).then(function(){
                          $('#usuarios_table').empty();
                          getUserData();
                      })
                }
            })
    }else{
        swal(
            'Error',
            'Se presentó un error, inténtalo de nuevo',
            'error'
          )
    } 
}

function asignarCursoUsuario(){
    //obtener el curso seleccionado para asignarle usuarios
    let selectedCurso = $('#select-cursos').val(),
        idCurso,
        userId = [],
        url = server+'/asignarCurso.php';
    switch (selectedCurso) {
        case "Suspensión":
            idCurso = 1;
            break;
        case "Reconexión":
            idCurso = 2;
            break;
        default:
            idCurso = 0;
            break;
    }

    //obtener los usuarios que serán asignados
    $('input[type="checkbox"]:checked').each(function(){
        userId.push($(this).val());
    })
    $.post(url, {token: sessionStorage.getItem('token'), users: JSON.stringify(userId), curso: idCurso})
        .then(function(res){
            let response = JSON.parse(res);
            if(response.err){
                swal(
                    'Error',
                    response.err,
                    'error'
                  )
            }else{
                swal(
                    'Éxito',
                    'Usuario añadido correctamente al curso indicado',
                    'success'
                  ).then(function(){
                      $('#cursousuario_table, #cursos_table, #usuarios_table').empty();
                      $('#select-cursos option').not('option:first').remove();
                      $('.user-check p').remove();
                      getUserData();
                  })
            }
        })
}

function loadTables(data){
    data.usuarios.forEach(function(usuario) {
        $('#usuarios_table').append(`
        <tr>
            <td>${usuario.cedula}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
        </tr>
        `)
        $('.user-check').append(`
        <p>
            <input type="checkbox" id="${usuario.cedula}" value="${usuario.cedula}"/>
            <label for="${usuario.cedula}">${usuario.nombre}</label>
        </p>
        `)
    }, this);
    data.cursos.forEach(function(curso) {
        $('#cursos_table').append(`
        <tr>
            <td>${curso.nombre}</td>
        </tr>
        `)
        $('#select-cursos').append(`
        <option value="${curso.nombre}">${curso.nombre}</option>
        `)
    }, this);
    data.cursos_usuario.forEach(function(cu) {
        $('#cursousuario_table').append(`
        <tr>
            <td>${cu.cedula}</td>
            <td class="center-align">${cu.nombre}</td>
            <td>${cu.curso}</td>
            <td class="center-align">${cu.etapa_finalizada}</td>
            <td>${cu.fecha_fin_etapa.toString()}</td>
        </tr>
        `)
    }, this);
}

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
    
}

function getUserData(){
    let url = server+'admin.php';
    $.post(url, {token: sessionStorage.getItem('token')})
        .done(function(res){
            data = JSON.parse(res);
            if(data.err){
                alert(data.err);
                window.location.href = "admin.html";
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
        alert("Ningún campo debe ser vacío");
        return null;
    }else if(pwd != pwd2){
        alert("Las contraseñas no coinciden");
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
                    alert(response.err);
                }else{
                    alert('Usuario añadido con éxito');
                    $('#usuarios_table').empty();
                    getUserData();
                }
            })
    }else alert('no valid');
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
    }, this);
    data.cursos.forEach(function(curso) {
        $('#cursos_table').append(`
        <tr>
            <td>${curso.nombre}</td>
        </tr>
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

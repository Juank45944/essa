const server = 'http://localhost/essa/server/';

$(function(){
    sessionStorage.clear();
    bindEvents();

    
})


function bindEvents(){
    $('#registrate_btn').click(function(){
        $('#login').hide();
        $('#registro').show();
    })

    $('#atras_btn, #atrasrec_btn').click(function(){
        $('#login').show();
        $('#registro, #recuperar').hide();
    })

    $('#recuperar_btn').click(function(){
        $('#login').hide();        
        $('#recuperar').show();
    })

    $('#ingresar_btn').click(function(){
        login();
    })

    $('#enviar_btn').click(function(){
        register();
    })
    
}


function validateLogin(){
    let cedula = $('#cedula').val();
    let password = $('#password').val();

    if(cedula=="" || password==""){
        alert("Ningún campo debe ser vacío")
        return null;
    }else{
        return {cedula: cedula, pwd: password};
    }

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
            pwd: pwd
        }
    }

}

function login(){
    let url = server+'login.php';
    if(validateLogin()){
        let data = validateLogin();
        $.post(url, data)
            .done(function(res){
                let response = JSON.parse(res);
                if(response.err){
                    alert(response.err);
                }else{
                    sessionStorage.setItem('token', response.token);
                    window.location.href="inicio.html";
                }
            });
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
                    sessionStorage.setItem('token', response.token);
                    window.location.href="inicio.html";
                }
            })
    }
}

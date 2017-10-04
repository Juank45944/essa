const server = 'http://localhost/essa/server/';

$(function(){
    sessionStorage.clear();
    bindEvents();

    
})


function bindEvents(){
    $('#ingresar_btn').click(function(){
        login();
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


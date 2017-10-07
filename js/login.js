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
    let email = $('#email').val();
    let password = $('#password').val();

    if(email=="" || password==""){
        swal(
            'Error',
            'Ningún campo debe ser vacío',
            'error'
          )
        return null;
    }else{
        return {email: email, pwd: password};
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
                    swal(
                        'Error',
                        response.err,
                        'error'
                      )
                }else{
                    sessionStorage.setItem('token', response.token);
                    window.location.href="inicio.html";
                }
            });
    }

}


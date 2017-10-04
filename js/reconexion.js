const server = 'http://localhost/essa/server/';

$(function(){
    getUserData();
    bindEvents();
})

function getUserData(){
    let url = server+'curso.php';
    $.post(url, {token: sessionStorage.getItem('token')})
        .done(function(res){
            data = JSON.parse(res);
            if(data.err){
                alert(data.err);
                window.location.href = "login.html";
            }else{
                console.log('bien');
            }
        })
}

function initModals(){
    $('#item1_modal').modal();
}
function bindEvents(){
    initModals();
    $('#item1').click(function(){
        $('#item1_modal').modal('open');
    })
    $('#logout').click(function(){
        logout();
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
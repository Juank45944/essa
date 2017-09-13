$(function(){

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
}

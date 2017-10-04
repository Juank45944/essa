$(function(){
    
    bindEvents();
})

function initModals(){
    $('#item1_modal').modal();
    $('#item5_modal').modal();
    
}
function bindEvents(){
    initModals();
    $('#item1').click(function(){
        $('#item1_modal').modal('open');
    })
    $('#item5').click(function(){
        $('#item5_modal').modal('open');
    })
}
/*function cambiarPagina(){
    $('#item5').click(function(){
        window.location.href="preguntas.html";
    })
}*/



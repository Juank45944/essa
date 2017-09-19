$(function(){
    
    bindEvents();
})

function initModals(){
    $('#item1_modal').modal();
}
function bindEvents(){
    initModals();
    $('#item1').click(function(){
        $('#item1_modal').modal('open');
    })
}
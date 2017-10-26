$(function(){
    $('.calif-cuadro').hover(function(){
        $(this).addClass('animated pulse');
    }, function(){
        $(this).removeClass('animated pulse');
    })

    $('.atrib-img-2, .atrib-img-3, .atrib-img-4, .atrib-img-5, .atrib-img').hover(function(){
        $(this).addClass('animated tada');
    }, function(){
        $(this).removeClass('animated tada');
    })
})


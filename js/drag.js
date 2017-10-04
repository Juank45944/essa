$(document).ready(function () {
    $('#test, #test2, .at_validate').sortable({
        connectWith: ".listsa",
        cursor: "move"

    }).disableSelection();
    $(".at_validate").mouseover(function () {
        var acc_color = $(this).attr("accept_color");
        var come_color = $(this).find('div').attr('id');
        if (acc_color != come_color) {
            $("#test").append($(this).find('div'));
        }
        else {
            $(this).remove().fadeOut(1000);
            var color_code = $(this).find('div').attr('color_code');
            var push_div = '<div class="col-md-12" style="background-color: ' + color_code + ';margin-bottom:10px;"> <h3 style="color: green;">Color has been filled out</h3></div>'
            $(push_div).hide().prependTo("#test2").fadeIn(1000);
        }
    })
});
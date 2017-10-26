<?php
session_start();
require('./lib.php');
$api = new API();


if(isset($_POST['token']) && $_POST['token']!="" && $_POST['token'] == $_SESSION['token']){
    $response['inserted'] = $api->saveProgress($_POST['etapa'], $_SESSION['user_id'], $_POST['curso']);
    if(!$response['inserted']){
        $response['err'] = "Ocurrió un error al guardar los datos, inténtelo de nuevo en unos minutos";
    }
}else{
    $response['err'] = "No has iniciado sesión, haz click en OK para ir a la página de inicio de sesión.";
}


echo json_encode($response);
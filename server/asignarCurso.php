<?php
session_start();
require('./lib.php');

$api = new API();

if(isset($_POST['token']) && $_POST['token']!="" && $_POST['token'] == $_SESSION['token']){
    if (isset($_POST['users']) && isset($_POST['curso']) ) {
        $response['created'] = $api->asignarCurso(json_decode($_POST['users']), $_POST['curso']);
    }else{
        $response['err'] = "Error en el envío de datos";
    }
}else{
    $response['err'] = "Error en el envío de datos";
}



echo json_encode($response);


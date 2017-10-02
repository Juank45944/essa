<?php

require('./lib.php');

$api = new API();
if (isset($_POST['cedula']) && isset($_POST['pwd']) && isset($_POST['nombre']) && isset($_POST['email']) && isset($_POST['genero'])) {
    $response['created'] = $api->register($_POST['nombre'], $_POST['cedula'], $_POST['email'], $_POST['genero'], $_POST['pwd']);
    if($response['created']){
        $response['token'] = $api->getToken(20);
        session_start();
        $_SESSION['token'] = $response['token'];
        $_SESSION['user_id'] = $_POST['cedula'];
    }
}else{
    $response['err'] = "Error en el envío de datos";
}


echo json_encode($response);


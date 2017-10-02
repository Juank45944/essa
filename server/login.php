<?php

require('./lib.php');

$api = new API();
if (isset($_POST['cedula']) && isset($_POST['pwd'])) {
    $response = $api->login($_POST['cedula'], $_POST['pwd']);
    if(isset($response['cedula'])){
        $response['token'] = $api->getToken(20);
        session_start();
        $_SESSION['token'] = $response['token'];
        $_SESSION['user_id'] = $response['cedula'];
    }
}else{
    $response['err'] = "Error en el envío de datos";
}


echo json_encode($response);


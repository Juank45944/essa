<?php
session_start();
require('./lib.php');

$api = new API();

if(isset($_POST['token']) && $_POST['token']!="" && $_POST['token'] == $_SESSION['token']){
    if (isset($_POST['cedula']) && isset($_POST['pwd']) && isset($_POST['nombre']) && isset($_POST['email']) && isset($_POST['genero'])) {
        $response['created'] = $api->register($_POST['nombre'], $_POST['cedula'], $_POST['email'], $_POST['genero'], $_POST['pwd']);
    }else{
        $response['err'] = "Error en el envío de datos";
    }
}else{
    $response['err'] = "Error en el envío de datos";
}



echo json_encode($response);


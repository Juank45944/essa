<?php
session_start();
require('./lib.php');
$api = new API();


if(isset($_POST['token']) && $_POST['token']!="" && $_POST['token'] == $_SESSION['token']){
    if(isset($_POST['nombre_curso'])){
        $response = $api->getProgress($_POST['nombre_curso'], $_SESSION['user_id']);
    }else{
        $response = $api->getInicioData($_SESSION['user_id']);
    }
}else{
    $response['err'] = "No has iniciado sesión, haz click en OK para ir a la página de inicio de sesión.";
}


echo json_encode($response);
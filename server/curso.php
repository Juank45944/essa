<?php
session_start();
require('./lib.php');
$api = new API();


if(isset($_POST['token']) && $_POST['token']!="" && $_POST['token'] == $_SESSION['token']){
    $response['msj'] = "Success";
}else{
    $response['err'] = "No has iniciado sesión, haz click en Aceptar para ir a la página de inicio de sesión.";
}


echo json_encode($response);
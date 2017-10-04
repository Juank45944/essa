<?php
session_start();
$request_token = $_POST['token'];
$session_token = $_SESSION['token'];


if($request_token == $session_token){
    session_destroy();
    $response['msj']=true;
}else{
    $response['err'] = "No has iniciado sesión, haz click <a href='login.html'>aquí</a> para ir a la página de inicio de sesión.";
}


echo json_encode($response);
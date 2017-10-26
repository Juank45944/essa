<?php
date_default_timezone_set('America/Bogota');


class API{

    private $servername = "localhost";
    private $username = "essa_user";
    private $password = "1234567890";
    private $db = "essa_db";
    private $con;

    public function __construct(){
        $this->connectToDatabase();
    }

    public function connectToDatabase(){
        $this->con = new mysqli($this->servername, $this->username, $this->password, $this->db);
        if ($this->con->connect_error) {
            die("Connection failed: " . $this->con->connect_error);
        } 
    }

    public function login($email, $pwd){
        $consulta = "SELECT cedula, nombre FROM usuarios WHERE email='".$email."' AND cedula='".$pwd."'";
        
        if ($resultado = $this->con->query($consulta)) {
        
            /* obtener un array asociativo */
            $row = $resultado->fetch_array(MYSQLI_ASSOC);
            
            if ( is_null($row['cedula']) || $row['cedula']=="" ) {
                $row['err']= "El correo electrónico o la contraseña están equivocadas, inténtalo de nuevo.";
            }

            /* liberar el conjunto de resultados */
            $resultado->free();
            /* cerrar la conexión */
            $this->con->close();
            return $row;
        }else {
            $row['err']= "El correo electrónico o la contraseña están equivocadas, inténtalo de nuevo.";
            /* cerrar la conexión */
            $this->con->close();
            return $row;
        }   
    }

    public function register($nombre, $cedula, $email, $genero, $pwd){
        $consulta = "INSERT INTO usuarios (cedula, nombre, email, pwd, genero) VALUES('".$cedula."', '".$nombre."', '".$email."', '".$pwd."', '".$genero."')";

        if($resultado = $this->con->query($consulta)){
            return true;
            $this->con->close();
        }else return false;
    }

    public function asignarCurso($users, $curso){
        //verificar si cada usuario ya está en el curso que se va a asignar
        $usuariosAgregar = array();
        foreach ($users as $user) {
            $consulta= "SELECT * FROM cursos_usuario JOIN usuarios ON usuarios.id = cursos_usuario.fk_usuario WHERE usuarios.cedula = '".$user."' AND cursos_usuario.fk_curso = ".$curso;
            if($resultado = $this->con->query($consulta)){
                $filas = $resultado->fetch_assoc();
                
                if(count($filas)==0){
                    array_push($usuariosAgregar, $user);
                }
            }
        }
        
        //insertar solo los usuarios que no han sido añadidos ya al curso indicado
        $consulta = "";
        $created = true;
        $date = date('Y-m-d h:i:s');
        foreach ($usuariosAgregar as $user) {
            $consulta = "INSERT INTO cursos_usuario (fk_usuario, fk_curso, finalizado) VALUES((SELECT id FROM usuarios WHERE usuarios.cedula = '".$user."'), ".$curso.", 0);";
            if($resultado = $this->con->query($consulta)){
                $consulta2 = "INSERT INTO progreso_curso (fk_curso_usuario, etapa_finalizada, fecha_finalizacion) VALUES ((SELECT id FROM cursos_usuario WHERE fk_usuario= (SELECT id FROM usuarios WHERE usuarios.cedula = '".$user."') AND fk_curso=".$curso." ), -1, '".$date."');";
                if($resultado2 = $this->con->query($consulta2)){

                }else{
                    $created = false;
                }
            }else $created = false;
        }
        return $created;

    }

    public function crypto_rand_secure($min, $max)
    {
        $range = $max - $min;
        if ($range < 1) return $min; // not so random...
        $log = ceil(log($range, 2));
        $bytes = (int) ($log / 8) + 1; // length in bytes
        $bits = (int) $log + 1; // length in bits
        $filter = (int) (1 << $bits) - 1; // set all lower bits to 1
        do {
            $rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
            $rnd = $rnd & $filter; // discard irrelevant bits
        } while ($rnd > $range);
        return $min + $rnd;
    }
    
    public function getToken($length)
    {
        $token = "";
        $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $codeAlphabet.= "abcdefghijklmnopqrstuvwxyz";
        $codeAlphabet.= "0123456789";
        $max = strlen($codeAlphabet); // edited
    
        for ($i=0; $i < $length; $i++) {
            $token .= $codeAlphabet[$this->crypto_rand_secure(0, $max-1)];
        }
    
        return $token;
    }

    public function getInicioData($cedula){
        $consulta = "SELECT c.nombre, u.nombre AS username, u.genero from cursos AS c JOIN cursos_usuario AS cu ON c.id = cu.fk_curso JOIN usuarios AS u ON u.id = cu.fk_usuario WHERE u.cedula = '".$cedula."'";
        if($resultado = $this->con->query($consulta)){
            /* obtener un array asociativo */
            $data = $this->resultToArray($resultado);
            array_walk($data, function(&$value) {
                array_walk($value, function(&$v){
                    $v = utf8_encode($v);
                });
            });
            
            if (count($data)==0) {
                $data['err']= "No tienes cursos habilitados en el momento";
            }
            /* liberar el conjunto de resultados */
            $resultado->free();
            /* cerrar la conexión */
            $this->con->close();
            return $data;
        }else{
            $row['err']= "Hay un error al obtener los cursos, inténtalo más tarde";
            /* cerrar la conexión */
            $this->con->close();
            return $row;
        }
    }

    public function resultToArray($result) {
        $rows = array();
        while($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        return $rows;
    }

    public function getProgress($curso, $cedula){
        switch ($curso) {
            case 'Suspensión':
                $id_curso = 1;
                break;
            case 'Reconexión':
                $id_curso = 2;
                break;
            case 'Contact Center':
                $id_curso = 3;
                break;
            case 'Comportamiento Presencial':
                $id_curso = 4;
                break;
            default:
                $id_curso = null;
                break;
        }

        $consulta = "SELECT MAX(pc.etapa_finalizada) AS etapa FROM progreso_curso AS pc
        JOIN cursos_usuario AS cu ON cu.id = pc.fk_curso_usuario
        JOIN cursos AS c ON c.id = cu.fk_curso
        JOIN usuarios AS u ON u.id = cu.fk_usuario
        WHERE c.id = '".$id_curso."' AND u.cedula = '".$cedula."'";

        if ($resultado = $this->con->query($consulta)) {
            /* obtener un array asociativo */
            $row = $resultado->fetch_assoc();
            if(is_null($row['etapa'])){
                $row['etapa']=-1;
            }
            /* liberar el conjunto de resultados */
            $resultado->free();
            /* cerrar la conexión */
            $this->con->close();
            return $row;
        }  
    }

    public function getAllData(){
        //USUARIOS
        $consulta = "SELECT cedula, nombre, email FROM usuarios";
        if($resultado = $this->con->query($consulta)){
            /* obtener un array asociativo */
            $usuarios = $this->resultToArray($resultado);
            array_walk($usuarios, function(&$value) {
                array_walk($value, function(&$v){
                    $v = utf8_encode($v);
                });
            });
            /* liberar el conjunto de resultados */
            $resultado->free();
            
        }else{
            $row['err']= "Hay un error al obtener los cursos, inténtalo más tarde";
            /* cerrar la conexión */
            $this->con->close();
            return $row;
        }

        //CURSOS
        $consulta = "SELECT nombre FROM cursos";
        if($resultado = $this->con->query($consulta)){
            /* obtener un array asociativo */
            $cursos = $this->resultToArray($resultado);
            array_walk($cursos, function(&$value) {
                array_walk($value, function(&$v){
                    $v = utf8_encode($v);
                });
            });
            /* liberar el conjunto de resultados */
            $resultado->free();
            
        }else{
            $row['err']= "Hay un error al obtener los cursos, inténtalo más tarde";
            /* cerrar la conexión */
            $this->con->close();
            return $row;
        }

        //CURSOSxUSUARIO
        $consulta = "SELECT usuarios.cedula, usuarios.nombre, cursos.nombre as curso, progreso_curso.etapa_finalizada, progreso_curso.fecha_finalizacion as fecha_fin_etapa FROM usuarios JOIN cursos_usuario ON usuarios.id = cursos_usuario.fk_usuario JOIN cursos ON cursos.id = cursos_usuario.fk_curso JOIN progreso_curso ON progreso_curso.fk_curso_usuario = cursos_usuario.id ORDER BY usuarios.cedula, etapa_finalizada";
        if($resultado = $this->con->query($consulta)){
            /* obtener un array asociativo */
            $cursos_usuario = $this->resultToArray($resultado);
            array_walk($cursos_usuario, function(&$value) {
                array_walk($value, function(&$v){
                    $v = utf8_encode($v);
                });
            });
            /* liberar el conjunto de resultados */
            $resultado->free();
            
        }else{
            $row['err']= "Hay un error al obtener los cursos, inténtalo más tarde";
            /* cerrar la conexión */
            $this->con->close();
            return $row;
        }

        $response['usuarios']=$usuarios;
        $response['cursos']=$cursos;
        $response['cursos_usuario']=$cursos_usuario;


        /* cerrar la conexión */
        $this->con->close();

        return $response;
    }

    public function saveProgress($etapa, $cedula, $idCurso){
        $date = date('Y-m-d h:i:s');
        $consulta = "INSERT INTO progreso_curso (fk_curso_usuario, etapa_finalizada, fecha_finalizacion) VALUES ((SELECT id FROM cursos_usuario WHERE fk_curso=".$idCurso." AND fk_usuario=(SELECT id FROM usuarios WHERE cedula = '".$cedula."')), ".$etapa.", '".$date."');";
        if($resultado = $this->con->query($consulta)){
            return true;
        }else return false;
    }



}

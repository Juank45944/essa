<?php

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

    public function login($cedula, $pwd){
        $consulta = "SELECT cedula FROM usuarios WHERE cedula='".$cedula."' AND pwd='".$pwd."'";
        
        if ($resultado = $this->con->query($consulta)) {
        
            /* obtener un array asociativo */
            $row = $resultado->fetch_array(MYSQLI_ASSOC);
            
            if ( is_null($row['cedula']) || $row['cedula']=="" ) {
                $row['err']= "La cédula o la contraseña están equivocadas, inténtalo de nuevo.";
            }

            /* liberar el conjunto de resultados */
            $resultado->free();
            /* cerrar la conexión */
            $this->con->close();
            return $row;
        }else {
            $row['err']= "La cédula o la contraseña están equivocadas, inténtalo de nuevo.";
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
                $row['etapa']=0;
            }
            /* liberar el conjunto de resultados */
            $resultado->free();
            /* cerrar la conexión */
            $this->con->close();
            return $row;
        }  
    }



}

<?php

include('perfil.php');

class usuario {

    private $id;
    private $apellido;
    private $nombre;
    private $usuario;
    private $password;
    private $poseePasswordPorDefecto;    
    private $perfil;
    
    function __construct($usu = "", $pass = "", $id = 0, $ap="", $nom="", $idPerfil = 0, $nombrePerfil = "")
    {
        $this->usuario = $usu;
        $this->password = $pass;
        $this->id = $id;
        $this->apellido = $ap;
        $this->nombre = $nom;
        
        if(!$idPerfil == 0)
        {
            $perfil = new perfil($idPerfil, $nombrePerfil);
            $this->perfil = $perfil;
        }
        
        if($pass != "")
        {
            $this->encriptarPassword();
        }
    }
        
    function getId()
    {
        return $this->id;
    }
    
    function getApellido()
    {
        return $this->apellido;
    }
    
    function getNombre()
    {
        return $this->nombre;
    }
    
    function getUsuario()
    {
        return $this->usuario;
    }
        
    function getIdPerfil()
    {
        return $this->perfil->getId();
    }
    
    function getNombrePerfil()
    {
        return $this->perfil->getNombre();
    }
    
    function estaAutorizado()
    {
        $autorizado = false;
        $perfil = $this->perfil;
        $idPerfil = $perfil->getId();
        
        return true;
        return $autorizado;
    }
        
    function getPassword()
    {
        return $this->password;        
    }
    
    function setPassword($password)
    {
        $this->password = $password;
        $this->encriptarPassword();
    }
    
    function setPoseePasswordPorDefecto($passPorDefecto)
    {
        $this->poseePasswordPorDefecto = $passPorDefecto;
    }
    
    function getPoseePasswordPorDefecto()
    {
        return $this->poseePasswordPorDefecto;
    }
    
    private function encriptarPassword()
    {
        $salt = 'obras_licitaciones';
        $saltedPass = $this->password . $salt;
        $this->password = md5($saltedPass);        
    }
}

class UsuarioDAO
{
    function ObtenerDatosUsuario($nombreUsuario)
    {
        $usuario = new usuario();
        try
        {
            if($conexion = getConexionMysqli())
            {   
                $selectSql = "SELECT Us.id_usuario, Us.usuario, Us.apellido, Us.nombre,";
                $selectSql.= " Us.password_por_defecto, Us.idperfil, Per.Nombre as NombrePerfil";
                $selectSql.= " FROM usuarios AS Us";
                $selectSql.= " JOIN Perfil AS Per ON Id = IdPerfil";
                $selectSql.= " WHERE usuario = ?";

                $consulta = $conexion->prepare($selectSql);
                $consulta->bind_param(('s'), $nombreUsuario);                
                
                if($consulta->execute())
                { 
                    $consulta->bind_result($id_usuario, $usuario, $apellido, $nombre, $password_por_defecto, $idPerfil, $nombrePerfil);
                    
                    while ($consulta->fetch()) { 
                        $idUsuario = $id_usuario;
                        $ap = $apellido;
                        $nom = $nombre;
                        $nomUsu = $usuario;
                        $passwordPorDefecto = ($password_por_defecto == '0')? false : true;

                        $idPerfil = $idPerfil;
                        $nombrePerfil = $nombrePerfil;
                        
                        $usuario = new usuario($nomUsu, "", $idUsuario, $ap, $nom, $idPerfil, $nombrePerfil);                        
                        $usuario->setPoseePasswordPorDefecto($passwordPorDefecto); 
                    }
                    mysqli_close($conexion);
                }
                else
                {
                    mysqli_close($conexion);
                    throw new Exception('Error: Ha fallado la operación con la base de datos. ' . mysqli_error($conexion));
                }
            }
            else
            {
                mysqli_close($conexion);
                throw new Exception('Error: Fallo en la conexion con la base de datos' . mysqli_error($conexion));
            }                
        } catch (Exception $ex) {                
            throw $ex;
        }
        return $usuario;
    }
    
    function AutenticarUsuario($usuario)
    {
        $usuarioAutenticado = false;        
        try
        {
            if($conexion = getConexionMysqli())
            {
                $usr = $usuario->getUsuario();
                $pass = $usuario->getPassword();
                
                $selectSql = "SELECT COUNT(*) AS Conteo FROM usuarios";
                $selectSql.= " WHERE (usuario = ? and clave = ?)";
                
                $consulta = $conexion->prepare($selectSql);
                $consulta->bind_param(('ss'), $usr, $pass);
                
                if($consulta->execute())
                {
                    $consulta->bind_result($resultado);
                    $consulta->fetch();
                    $usuarioAutenticado = ($resultado == '1')? true : false;                    
                }
                else
                {
                    mysqli_close($conexion);
                    throw new Exception('Error: Ha fallado la operación con la base de datos. ' . mysqli_error($conexion));
                }                
                $consulta = mysqli_query($conexion, $selectSql);
               }
            else
            {
                mysqli_close($conexion);
                throw new Exception('Error: Fallo en la conexion con la base de datos' . mysqli_error($conexion));
            }
        } catch (Exception $ex) {
            throw $ex;
        }
        return $usuarioAutenticado;
    }
        
    function ReingresarPassword($usuario)
    {
        try
        {
            if($conexion = getConexionMysqli())
            {   
                $pass = $usuario->getPassword();
                $id  = $usuario->getId();
                
                $updateSql = "UPDATE usuarios SET clave = ?, password_por_defecto = 0";
                $updateSql.= " WHERE id_usuario = ?";

                $consulta = $conexion->prepare($updateSql);
                $consulta->bind_param(('si'), $pass, $id);
                                
                if($consulta->execute())
                {
                    mysqli_close($conexion);
                }
                else
                {
                    mysqli_close($conexion);
                    throw new Exception('Error: Ha fallado la operación con la base de datos. ' . mysqli_error($conexion));
                }
            }
            else
            {
                mysqli_close($conexion);
                throw new Exception('Error: Fallo en la conexion con la base de datos' . mysqli_error($conexion));
            }                
        } catch (Exception $ex) {                
            throw $ex;
        }
    }
        
    
}
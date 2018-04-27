<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Persona
 *
 * @author root
 */
class Persona {
    //put your code here
    
    private $apellido;
    private $nombre;
    
    function Persona($nom, $ap)
    {
        
        // esto no va a funcionar ni va a generar un error
        //$apellido = $ap;
        //$nombre = $nom;
        $this->apellido = $ap;
        $this->nombre = $nom;
        
    }
    
    function __clone()
    {
        // No hacer nada, conservar el estado del objeto original
    }
    
    function GetNombre()
    {
        return $this->nombre;
    }
    
    function GetApellido()
    {
        return $this->apellido;
    }
    
    function NombreCompleto()
    {
        return $this->apellido . ', ' . $this->nombre;
    }
    
    
}

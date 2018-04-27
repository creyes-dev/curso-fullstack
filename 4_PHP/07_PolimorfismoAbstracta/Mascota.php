<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Mascota
 *
 * @author root
 */
abstract class Mascota {
    //put your code here
    
    private $nombre;
    
    abstract public function GetDescripcionCantidadPresas();
    
    function GetNombreMascota()
    {
        return $this->nombre;
    }
    
    function SetNombreMascota($nom)
    {
        $this->nombre = $nom;
    }
    
}

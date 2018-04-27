<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Perro
 *
 * @author root
 */

include 'Mascota.php';

class Perro extends Mascota {
    //put your code here
    private $cantGatosCazados;
    
    function Perro($cantGatosCazados)
    {
        $this->cantGatosCazados = $cantGatosCazados;
    }
    
    public function GetDescripcionCantidadPresas()
    {
        $descripcionCantidadPresas;
        if($this->cantGatosCazados > 0)
        {
            $descripcionCantidadPresas = 'He cazado ' . $this->cantGatosCazados . ' gatos';
        }
        else
        {
            $descripcionCantidadPresas = 'No he cazado gatos';
        }
        
        return $descripcionCantidadPresas;  
    }
    
}

<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Gato
 *
 * @author root
 */

include 'Mascota.php';

class Gato extends Mascota {
    //put your code here
    
    private $CantRatonesCazados;
    
    function Gato($cantRatonesCazados)
    {
        $this->CantRatonesCazados = cantRatonesCazados;
    }

    public function GetDescripcionCantidadPresas()
    {
        $descripcionCantidadPresas;
        if($this->CantRatonesCazados > 0)
        {
            $descripcionCantidadPresas = 'He cazado ' . $this->CantRatonesCazados . ' ratones';
        }
        else
        {
            $descripcionCantidadPresas = 'No he cazado ratones';
        }
        
        return $descripcionCantidadPresas;        
    }
    
    
}

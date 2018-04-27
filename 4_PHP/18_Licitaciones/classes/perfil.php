<?php

class perfil {
    private $id;
    private $nombre;
        
    function __construct($id, $nom)
    {
        $this->id = $id;
        $this->nombre = $nom;
    }
        
    function getId()
    {
        return $this->id;
    }
        
    function getNombre()
    {
        return $this->nombre;
    }       
}

?>
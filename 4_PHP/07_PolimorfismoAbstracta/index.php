<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
        // put your code here
        include 'Gato.php';
        include 'Perro.php';
        
        $gato1 = new Gato(22);
        $gato1->SetNombreMascota('gato loco');
        
        $perro2 = new Perro(0);
        $perro2->SetNombreMascota('Alderete');
        
        echo("Mascota: " . $gato1->GetNombreMascota() . '. ' . $gato1->GetDescripcionCantidadPresas());
        
        echo("");
        
        echo("Mascota: " . $perro2->GetNombreMascota() . '. ' . $perro2->GetDescripcionCantidadPresas());
        
        ?>
    </body>
</html>

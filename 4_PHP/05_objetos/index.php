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
            include 'Persona.php';
            
            // Instanciacion
            
            $per1 = new Persona('Reyes','Cristian');
        
            echo "Apellido: " . $per1->GetApellido();
            
            echo "</br>";
            
            echo "Nombre: " . $per1->GetNombre();
            
            echo "</br>";
            
            echo "Nombre completo: " . $per1->NombreCompleto();
            
            // Clonacion
            
            echo "</br>";
            
            $per2 = new Persona('Ana', 'Misia');
            
            $per2 = clone $per1; // Ahora el objeto de $per2 no va a ser Ana Misia sino Cristian Reyes
            
            // Identidad
            
            echo "</br>";
                        
            if($per1 instanceof Perro)
            {
                echo 'Es un perro!';
            }
            elseif($per1 instanceof Persona) 
            {
                echo 'Es una persona!';
            }
            
            if($per1 == $per2)
            {
                echo 'El personal fue clonado';
            }
            else {
                echo 'El personal no fue clonado';
            }
            
            if($per1 === $per2)
            {
                echo 'Las variables referencian al mismo objeto';
            }
            else
            {
                echo 'Las variables referencian a objetos distintos (el objeto clonado es un objeto distinto, la referencia es distinta)';
            }
            
            
            
        ?>
    </body>
</html>

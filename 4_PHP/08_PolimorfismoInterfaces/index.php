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
            include 'Serpiente.php';
            include 'Pajaro.php';
        
            $animal1 = new Pajaro();
            echo($animal1->moverse());
            
            echo '<br/>';
            
            $animal2 = new Serpiente();
            echo($animal2->Moverse());
            
            
        ?>
    </body>
</html>

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
            $a = new stdclass;
            $b = $a;
            $c = &$a;
            
            $a->foo = 42;
            
            // a,b y c van a tener el valor 42 en su propiedad a
            var_dump($a->foo);
            var_dump($b->foo);
            var_dump($c->foo);
                        
            echo "<br />";
            echo "<br />";
            echo "<br />";
            
            // ahora cambio la variable $a para que posea la referencia del
            // objeto 42 en vez de la referencia al a instancia de la clase
            // stdclass
            $a = 42;
            
            // es evidente que a y c van a valer 42, pero que pasa con b? 
            // b va a conservar la referencia a la variable con foo-> 42
            var_dump($a);
            var_dump($b);
            var_dump($c);
                        
        ?>
    </body>
</html>

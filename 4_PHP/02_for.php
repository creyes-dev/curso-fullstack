<!DOCTYPE html>
<!--
    ENUNCIADO:
        Mostrar los numeros de 0 al 9, por cada numero par 
        excepto el cero mostrar un listado de numeros del 1 al 3

-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>        
        <p>Listado de numeros del cero al nueve</p>
        <ul>
            <?php        
                for ($nro=0; $nro<10; $nro++)
                {
                    echo "<li>$nro</li>";
                    
                    $resto = $nro % 2;
                    
                    if($resto==0 && $nro != 0)
                    {
                        echo "<ol>";
                        for($nro2=1; $nro2<4; $nro2++)
                        {
                            echo "<li>$nro2</li>";
                        }
                        echo"</ol>";   
                    }
                }
            ?>
        </ul>
    </body>
</html>

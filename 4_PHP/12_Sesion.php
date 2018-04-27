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
        
        session_start();
       
        // cargamos el nombre de la sesion que es NombreSesion seguida por un 
        // numero aleatorio
        $nombreSesion = 'NombreSesion' . rand(0,10000);
        session_name($nombreSesion);
        
        $_SESSION['VariableSesion1'] = 'Valor de la variable de sesion 1';
        $_SESSION['VariableSesion2'] = 'Valor de la variable de sesion 2';
        $_SESSION['VariableSesion3'] = 'Valor de la variable de sesion 3';
                
        MostrarEstadoObjetoSession($_SESSION);
        
        function MostrarEstadoObjetoSession($objetoSession)
        {
            // Un objeto de sesion es un array con un indice de acceso del tipo string
            if(is_array($objetoSession))    
            {
                echo 'NOMBRE DE SESION: <br/>';
                echo (session_name());
                echo '<br/>';
                
                echo 'VARIABLES DE SESION: <br/>';
                // print_r muestra el estado de todo el objeto de una forma mas
                // facil de leer que echo
                print_r($objetoSession);            
                echo '<br/>';
            }
        }       
        
        ?>
    </body>
</html>

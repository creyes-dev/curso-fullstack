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
            $idTarjeta1 = 0;
            $nombreTarjeta1 = 'Visa';
            $idTarjeta2  = 1;
            $nombreTarjeta2 = 'MasterCard';
            
            $tarjetasCredito[$idTarjeta1] = $nombreTarjeta1;
            $tarjetasCredito[$idTarjeta2] = $nombreTarjeta2;
            
            $mensaje = BuscarTarjetaDeCredito($tarjetasCredito, 1);
            echo($mensaje);
            echo("</br>");
            
            $mensaje = BuscarTarjetaDeCredito($tarjetasCredito, 99);
            echo($mensaje);
            
            function BuscarTarjetaDeCredito($tarjetasCredito, $idTarjeta)
            {
                set_error_handler("ManejadorBuscarTarjetaCredito");                                
                try
                {             
                    $mensaje = "Usted selecciono la tarjeta: " . $tarjetasCredito[$idTarjeta];
                    return $mensaje;
                } 
                catch (Exception $e) {
                    echo "Excepcion: " . $e->getMessage();
                }
            }
            
            function ManejadorBuscarTarjetaCredito($errno, $errmsg)
            {
                throw new Exception("Tarjeta inexistente. Nro. Error: $errno. Mensaje de Error = $errmsg");
            }
        
        ?>
    </body>
</html>

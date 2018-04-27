<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>FACTORIAL</title>
        
        <style type="text/css">
            th { text-align: left; background-color: #999; }
            th, td{ padding: 0.4em; }
            tr.alt td {background: #ddd; }
        </style>
        
    </head>
    <body>
        <h2>Calculo del factorial</h2>
        
        <table cellspacing="0" border="0" style="width: 20em; border: 1px solid #666;">
            <tr>
                <th>Nro.</th>
                <th>Factorial</th>
            </tr>
            <tr>
                <td>Numero 1</td>
                <td>1</td>
            </tr>
            <tr class="alt">
                <td>Numero 2</td>
                <td>2</td>                
            </tr>
            <?php            
                $iteraciones = 10;
                for($nro=2; $nro <= $iteraciones; $nro++)
                {
                    $descrNumero = "Numero " . $nro;
                    $factorial = $nro;
                    
                    for($op=$nro; $op >= 2; $op--)
                    {
                        $factorial = $factorial * $op;
                    }             
            ?>
            
            <tr <?php if($nro % 2 != 0) { echo ' class="alt" '; } ?> >
                <td> <?php echo("Numero " . $nro); ?> </td>
                <td> <?php echo($factorial); ?> </td>
            </tr>
            
            <?php
                }
            ?>           
        </table>
    </body>
</html>

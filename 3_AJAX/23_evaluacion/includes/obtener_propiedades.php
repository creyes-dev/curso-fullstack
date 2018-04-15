
<?php

    include('conexion.php'); 

    $selectSql = "SELECT id, barrio, calle_altura, descripcion, "; 
    $selectSql.= "       descripcion_corta, valor, entre_calles";
    $selectSql.= " FROM propiedad";

    if(isset($_REQUEST['prop'])){
        $selectSql.= " WHERE id = " . $_REQUEST['prop'];
    }

    if($conexion = getConexionMysqli()){
        $comando = mysqli_query($conexion, $selectSql);  
        
        while($row = mysqli_fetch_array($comando))
        {
            $resultados[] = array(
                'id'    => $row['id'],
                'ruta'  => $row['barrio'],
                'calleAltura' => $row['calle_altura'],
                'descripcion' => $row['descripcion'],
                'descripcionCorta' => $row['descripcion_corta'],
                'entreCalles' => $row['entre_calles']
            );
        }
    }
    
    // convertimos el array de datos a formato json
    echo json_encode($resultados, JSON_UNESCAPED_UNICODE);

?> 

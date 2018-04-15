<?php
    
    include('conexion.php'); 

    if(isset($_REQUEST['prop'])){

        $selectSql = "SELECT id_imagen, ruta_imagen, orden";
        $selectSql.= " FROM imagenes";
        $selectSql.= " WHERE id_propiedad = " . $_REQUEST['prop'];
        
        if($conexion = getConexionMysqli()){
            $comando = mysqli_query($conexion, $selectSql);
        
            while($row = mysqli_fetch_array($comando))
            {
                $resultados[] = array(
                    'id'          => $row['id_imagen'],
                    'ruta'        => $row['ruta_imagen'],
                    'orden'       => $row['orden']
                );
            }
            // convertimos el array de datos a formato json
            echo json_encode($resultados, JSON_UNESCAPED_UNICODE);
        }
    }

?>
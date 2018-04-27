<?php error_reporting (E_ALL ^ E_NOTICE); ?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<body>
<?php 
    session_start();
    include_once('../encabezado.php');
    include('../head.html');
    include('../includes/config.php');
    include('../includes/seguridad.php');
        
    if(AutorizarUsuario('/respuestas/main.php'))
    {
        MostrarListadoLicitaciones();
    }
    else {
        $url_respuestas = "http://www.enohsa.gob.ar/licitaciones/index.php";
        header('Location: ' . $url_respuestas);
    }
    
    function MostrarListadoLicitaciones()
    {
?>

<div class="contenedor">
    <div class="contenido limitar clearfix" style="margin-top: 30px;">
        <div class="caja_licitacion">
            <div class="titulo_licitacion" >Listado de licitaciones con consultas</div>
            
                <table class="tabla_licitaciones" cellspacing="0" >
                    <thead>
                        <tr>
                            <td class="titulo">NOMBRE</td>
                            <td class="titulo">PROVINCIA</td>
                            <td class="titulo">EJECUTOR</td>
                            <td class="titulo">ESTADO</td>
                            <td class="titulo">FECHA DE LLAMADO</td>
                            <td class="titulo">FECHA DE APERTURA</td>
                            <td class="titulo">CANT. CONSULTAS SIN RESPUESTA</td>
                            <td class="titulo">CONSULTAS</td>
                        </tr>
                    </thead>
                    <tbody>
                <?php
                    
                    try
                    {
                        if($conexion = getConexionMysqli())
                        {                            
                            $selectSql = "SELECT Lic.id_licitacion, Lic.nombre AS NombreLic, provincia_nombre, Lic.ejecutor,";
                            $selectSql.= " Est.Nombre AS NombreEst,";
                            $selectSql.= " DATE_FORMAT(Lic.fecha_llamado, '%d/%m/%Y') AS fecha_llamado,";
                            $selectSql.= " DATE_FORMAT(Lic.fecha_apertura, '%d/%m/%Y') AS fecha_apertura,";
                            $selectSql.= " IFNULL(CConsSinResp.CantSinResp,0) AS CantSinResponder";
                            $selectSql.= " FROM Licitaciones AS Lic";
                            $selectSql.= " JOIN Estados AS Est ON IdEstado = Lic.id_est";
                            $selectSql.= " JOIN provincias ON provincia_id = Lic.id_prov";
                            $selectSql.= " LEFT JOIN (";
                            $selectSql.= " SELECT IdLicitacion, COUNT(*) AS CantSinResp";
                            $selectSql.= " FROM Consulta"; 
                            $selectSql.= " WHERE (NOT PoseeRespuesta AND NOT Eliminada)"; 
                            $selectSql.= " GROUP BY IdLicitacion";
                            $selectSql.= " ) AS CConsSinResp ON CConsSinResp.IdLicitacion = Lic.id_licitacion";   
                            $selectSql.= " ORDER BY CConsSinResp.CantSinResp DESC, Lic.id_licitacion DESC";   
                                                                      
                            $consulta = $conexion->prepare($selectSql);

                            if($consulta->execute())
                            {
                                $consulta->bind_result($id, $nombreLicitacion, $provincia, $ejecutor, $nombreEstado, $fechaLlamado, $fechaApertura, $cantConsultasSinResponder );
                                
                                while($consulta->fetch())
                                {                                    
                                    ?>
                                        <tr>
                                            <td class="gris_oscuro"> <?php echo($nombreLicitacion); ?> </td>
                                            <td class="gris_oscuro"> <?php echo($provincia); ?> </td>
                                            <td class="gris_oscuro"> <?php echo($ejecutor); ?> </td>
                                            <td class="gris_oscuro"> <?php echo($nombreEstado); ?> </td>
                                            <td class="gris_oscuro"> <?php echo($fechaLlamado); ?> </td>
                                            <td class="gris_oscuro"> <?php echo($fechaApertura); ?> </td>
                                            <td class="gris_oscuro"> <?php echo($cantConsultasSinResponder); ?> </td>
                                            <td class="gris_oscuro">
                                                <a id="lnkConsultasLic<?php echo($id); ?>" 
                                                    href="consultas.php?idLic=<?php echo($id); ?>">
                                                    Consultas
                                                </a>
                                            </td>
                                        </tr>
                                    <?php                                    
                                }
                                mysqli_close($conexion);
                            }
                            else
                            {
                                mysqli_close($conexion);
                                throw new Exception('Error: Ha fallado la operación con la base de datos. ' . mysqli_error($conexion));
                            }                
                        }
                        else
                        {
                            mysqli_close($conexion);
                            throw new Exception('Error: Fallo en la conexion con la base de datos' . mysqli_error($conexion));
                        }
                    } catch (Exception $ex) {
                        throw $ex;
                    }    
                ?>   
            <tbody>
        </table>                                
        </div>
    </div>
    <?php         
    }
    ?>
    
</div>
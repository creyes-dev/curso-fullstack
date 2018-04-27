<?php 
    include('../head.html');    
    include('../includes/seguridad.php');
    include('../includes/config.php');  
    ?> 

    <head>
        <script type="text/javascript"> 
            jQuery(document).ready(function($) {
                $(".ButtonEliminarConsulta").click(function(e) {
                    e.preventDefault();                
                    var formulario = $(this).parent();
                    formulario.submit();
                });
            }); 
        </script>
    </head>

<?php 
    session_start();
    
    try
    {
        if(AutorizarUsuario('/respuestas/consultas.php'))
        {
            if(isset($_REQUEST["idLic"]))
            {
                $idLicitacion = $_REQUEST["idLic"];
                MostrarLicitacionConConsultas($idLicitacion);
            }
            else
            {
                if(isset($_POST["IdLicitacion"]) && (isset($_POST["IdConsulta"])) )
                {
                    $idLicitacion = $_POST["IdLicitacion"];
                    $idConsulta  = $_POST["IdConsulta"];
                    
                    $poseeRespuesta = ConsultaPoseeRespuesta($idConsulta);
                    if(!$poseeRespuesta)
                    {
                        EliminarConsulta($idConsulta);
                        MostrarLicitacionConConsultas($idLicitacion);
                    }
                }
            }
        }
        else {
            $url_login = "http://www.enohsa.gob.ar/licitaciones/index.php";
            header('Location: ' . $url_login);
        }
    } catch (Exception $ex) {
        throw $ex;
    }
    
   
    function MostrarLicitacionConConsultas($idLicitacion)
    {       
    ?>
        <div class="contenedor">
            <?php include_once('../encabezado.php'); ?>

            <div class="contenido limitar clearfix" style="margin-top: 30px;">
                <div class="caja_licitacion">
                    <div class="titulo_licitacion" >Listado de consultas de la licitación</div>
                    <div Id="DatosLicitacion">                    
                        <?php MostrarDatosLicitacion($idLicitacion); ?>
                    </div>
                    <div Id="ListadoConsultas">
                        <?php MostrarConsultasLicitacion($idLicitacion); ?>
                    </div>
                    
                </div>
            </div>
        </div>
    <?php 
    }

    function MostrarDatosLicitacion($idLicitacion)
    {
        try
        {
            if($conexion = getConexionMysqli())
            {                            
            $selectSql = "SELECT provincia_nombre, ejecutor, nombre";
            $selectSql.= " FROM Licitaciones";
            $selectSql.= " JOIN provincias ON provincia_id = id_prov";
            $selectSql.= " WHERE id_licitacion = ?";

            $consulta = $conexion->prepare($selectSql);
            $consulta->bind_param(('i'), $idLicitacion); 
            
            if($consulta->execute())
            {
                $consulta->bind_result($nombreProvincia, $ejecutor, $nombre);
                                
                while($consulta->fetch())
                {
                    echo("<div class=\"Titulo\">Provincia: </div><div>" . $nombreProvincia . "</div>");
                    echo("<div class=\"Titulo\">Ejecutor: </div><div>" . $ejecutor . "</div>");
                    echo("<div class=\"Titulo\">Licitacion: </div><div>" . $nombre . "</div>");
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
    }
    
    function MostrarConsultasLicitacion($idLicitacion)
    {
        try
        {
            if($conexion = getConexionMysqli())
            { 
            $selectSql = "SELECT Id, Asunto, Consulta, DATE_FORMAT(FechaHoraConsulta, '%d/%m/%Y %T') AS FechaHoraConsulta, ";
            $selectSql.= " PoseeRespuesta, Respuesta, DATE_FORMAT(FechaHoraRespuesta, '%d/%m/%Y %T') AS FechaHoraRespuesta, ";
            $selectSql.= " nombre as nom_usu, apellido as ap_usu, DATE_FORMAT(FechaUltimaModificacion, '%d/%m/%Y %T') AS FechaUltimaModificacion";
            $selectSql.= " FROM Consulta";
            $selectSql.= " LEFT JOIN usuarios ON id_usuario = IdUsuarioRespuesta";
            $selectSql.= " WHERE (IdLicitacion = ? AND NOT Eliminada)";
            $selectSql.= " ORDER BY PoseeRespuesta, Id DESC";
            
            $consulta = $conexion->prepare($selectSql);
            $consulta->bind_param(('i'), $idLicitacion);  
            
            if($consulta->execute())
            {
                $consulta->bind_result($Id, $Asunto, $Consulta, $FechaHoraConsulta, $PoseeRespuesta, $Respuesta, $FechaHoraRespuesta, $nom_usu, $ap_usu, $FechaUltimaModificacion);
                                
                $nroRegistro = 1;
                while($consulta->fetch())
                {
                    $nroRegistro++;
                    MostrarConsultaLicitacion($Id, $Asunto, $Consulta, $FechaHoraConsulta, $PoseeRespuesta, $Respuesta, $FechaHoraRespuesta, $nom_usu, $ap_usu, $FechaUltimaModificacion, $idLicitacion, $nroRegistro);
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
    }
    
    function MostrarConsultaLicitacion($id, $asunto, $consulta, $fechaHoraConsulta, $poseeRespuesta, $respuesta, $fechaHoraRespuesta, $nombreUsuario, $apellidoUsuario, $fechaUltimaModif, $idLicitacion, $nroRegistro)
    {
        try
        {
            $mod = $nroRegistro % 2;
            $usuario = $apellidoUsuario . ", " . $nombreUsuario;
            ?>
                
            <div class="BloqueConsulta" style="<?php if($mod==1){ echo("background-color: #FAFAFA;");} ?>">
                <div class="BloqueContenedor">                    
                    <div class="ContenedorConsulta">
                        <div class="NroConsulta"><p><?php echo("Consulta #" . $id); ?></p></div>
                        <div class="Asunto"><h3><?php echo($asunto); ?></h3></div>
                        <div class="Consulta"><p><?php echo($consulta); ?></p></div>
                        <div class="FechaHoraConsulta">
                            <span class="Fecha"><?php echo("Fecha y hora de la consulta: " . $fechaHoraConsulta); ?></span>    
                        </div>
                    </div>
                    <div class="LineaSeparadoraConsulta"></div>
                    
                    <?php if($poseeRespuesta) { ?>
                        <div class="ContenedorRespuesta">
                            <div class="Titulo">Respuesta: </div>
                            <div class="Respuesta"><p><?php echo($respuesta); ?></p></div>
                            <div class="Fechas">
                                <div class="FechaRespuesta">
                                    <span class="Fecha"><?php echo("Fecha y hora de la respuesta: " . $fechaHoraRespuesta); ?></span>
                                </div>
                                    <?php
                                    if($fechaUltimaModif != "")
                                    {
                                        if (!preg_match('/0000/',$fechaUltimaModif))
                                        {
                                            ?>
                                            <div class="FechaUltimaModificacion">
                                                <span class="Fecha"><?php echo("Fecha y hora de la última modificación: " . $fechaUltimaModif); ?></span>
                                            </div>
                                    <?php } } ?>
                            </div>
                            <div class="Usuario">
                                <span class="NombreUsuario"><?php echo("Usuario: " . $usuario); ?></span>
                            </div>
                        </div>                    
                    <?php } ?>
                    <div class="ContenedorPie">
                        <?php if(!$poseeRespuesta) { ?>
                            <div id="ContenedorResponder" class="ContenedorRespuesta">
                                <a id="lnkResponderConsulta<?php echo($id); ?>" 
                                   class="ButtonResponderConsulta" 
                                   href="formularioConsulta.php?idLic=<?php echo($idLicitacion); ?>&id=<?php echo($id); ?>">
                                    Responder
                                </a>
                            </div>
                            <div class="ContenedorEliminar">
                                <form action='consultas.php' method='POST' style="margin: 0px; padding: 0px;" id='frmEliminarConsulta<?php echo($id); ?>'>
                                    <input type='hidden' name='IdConsulta' value='<?php echo($id); ?>' />
                                    <input type='hidden' name='IdLicitacion' value='<?php echo($idLicitacion); ?>' />
                                    <a id="lnkEliminarConsulta<?php echo($id); ?>" class="ButtonEliminarConsulta" href="#">Eliminar</a>
                                </form>
                            </div>
                        <?php } else { ?>
                                   <div id="ContenedorModificarRespuesta" class="ContenedorModificar">
                                <a id="lnkModificarRespuesta<?php echo($id); ?>"
                                   class="ButtonResponderConsulta" 
                                   href="formularioConsulta.php?idLic=<?php echo($idLicitacion); ?>&id=<?php echo($id); ?>">
                                    Modificar
                                </a>
                            </div>
                        <?php } ?>
                    </div>
                </div>
            </div>            
        <?php 
            
        } catch (Exception $ex) {
            throw $ex;
        } 
    }
    
    function EliminarConsulta($idConsulta)
    {
        try
        {
            if($conexion = getConexionMysqli())
            {
                $updateSql = "UPDATE Consulta SET eliminada = 1 WHERE id = ?";
                $consulta = $conexion->prepare($updateSql);
                $consulta->bind_param(('i'), $idConsulta);
                
                if($consulta->execute())
                {
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
    }
    
    function ConsultaPoseeRespuesta($idConsulta)
    {
        $poseeRespuesta = false;        
        try
        {
            if($conexion = getConexionMysqli())
            {                
                $selectSql = "SELECT PoseeRespuesta FROM Consulta WHERE Id = ?";
                
                $consulta = $conexion->prepare($selectSql);
                $consulta->bind_param(('i'), $idConsulta);
                           
                if($consulta->execute())
                {
                    $consulta->bind_result($valor);
                    $consulta->fetch();                    
                    $poseeRespuesta = ($valor == '1')? true : false;  
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
        return $poseeRespuesta;
    }
    
    
?>   

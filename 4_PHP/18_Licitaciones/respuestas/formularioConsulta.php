<?php
    include('../head.html');    
    include_once('../encabezado.php');
    include('../includes/seguridad.php');
    include('../includes/config.php');  
    include('../includes/ListadoMensajesError.php'); 
    ?>

<head>
    <script type="text/javascript">
        jQuery(document).ready(function($) { 
            $(".BotonResponder").click(function(e) {
                e.preventDefault();
                var contenedorBoton = $(this).parent();
                var formularioRespuesta = contenedorBoton.parent();
                formularioRespuesta.submit();            
            });
        }); 
    </script>
</head>
    
<?php
    session_start();
    
    $listadoErrores = array();
    
    try
    {
        if(AutorizarUsuario('licitaciones/respuestas/formularioConsulta.php'))
        {
            if(isset($_REQUEST["idLic"]) && (isset($_REQUEST["id"])))
            {
                $idLicitacion = $_REQUEST["idLic"];
                $idConsulta = $_REQUEST["id"];             
                MostrarFormulario($idLicitacion, $idConsulta, $listadoErrores);
            }
            else 
                {
                    // El usuario hizo click en algun boton
                    if(isset($_POST["accion"]))
                    {
                        $idUsuario = $_SESSION["IdUsuarioLicitaciones"];
                        $idLicitacion = $_POST["IdLicitacion"];
                        $idConsulta = $_POST["IdConsulta"];
                        $respuesta = $_POST["respuesta"];

                        if($_POST["accion"] == "registrar")
                        {
                            // Registrar la respuesta de la consulta
                            ManejarEventoRegistroRespuesta($idUsuario, $idLicitacion, $idConsulta, $respuesta, $listadoErrores);
                        }
                        else
                        {
                            if($_POST["accion"] == "modificar")
                            {
                                // Modificar la modificacion de la consulta
                                ManejarEventoModificacionRespuesta($idUsuario, $idLicitacion, $idConsulta, $respuesta, $listadoErrores);
                            }
                        }
                    }
                }
        }
        else {
            $url_respuestas = "http://www.enohsa.gob.ar/licitaciones/index.php";
            header('Location: ' . $url_respuestas);
        }
    } catch (Exception $ex) {
        $mensajesError[] = $ex->getMessage();
        MostrarFormulario($idLicitacion, $idConsulta, $listadoErrores);
    }
    
    function ManejarEventoRegistroRespuesta($idUsuario, $idLicitacion, $idConsulta, $respuesta, &$listadoErrores)
    {
        $camposValidos = ValidarCamposRegistrarRespuesta($respuesta, $listadoErrores);
        if($camposValidos)
        {            
            $poseeRespuesta = ConsultaPoseeRespuesta($idConsulta);
            
            if(!$poseeRespuesta)
            {
                RegistrarRespuesta($idUsuario ,$idConsulta, $respuesta);
                RedireccionarPaginaLicitaciones($idLicitacion);
            }
            else {
                $listadoErrores[] = "Error: La consulta ya posee respuesta";
                MostrarFormulario($idLicitacion, $idConsulta, $listadoErrores);
            }
        }
        else
        {
            MostrarFormulario($idLicitacion, $idConsulta, $listadoErrores);
        }
    }
        
    function ManejarEventoModificacionRespuesta($idUsuario, $idLicitacion, $idConsulta, $respuesta, &$listadoErrores)
    {
        $camposValidos = ValidarCamposRegistrarRespuesta($respuesta, $listadoErrores);
        if($camposValidos)
        {
            $poseeRespuesta = ConsultaPoseeRespuesta($idConsulta);
            
            if($poseeRespuesta)
            {
                RegistrarModificacionRespuesta($idUsuario ,$idConsulta, $respuesta);
                RedireccionarPaginaLicitaciones($idLicitacion);
            }
            else {
                $listadoErrores[] = "Error: La consulta no posee respuesta";
                MostrarFormulario($idLicitacion, $idConsulta, $listadoErrores);
            }
        }
        else
        {
            MostrarFormulario($idLicitacion, $idConsulta, $listadoErrores);
        }
    }
    
    function MostrarFormulario($idLicitacion, $idConsulta, $listadoErrores) { ?>
        <div class="contenedor">

            <div class="contenido limitar clearfix" style="margin-top: 30px;">
                <div class="caja_licitacion">
                    <div class="titulo_licitacion" >Respuesta de la consulta de la licitación</div>
                    <div Id="DatosLicitacion">                    
                        <?php MostrarDatosLicitacion($idLicitacion); ?>
                    </div>
                    <div Id="ListadoConsultas">
                        <?php MostrarConsultaLicitacion($idLicitacion, $idConsulta, $listadoErrores); ?>
                    </div>                    
                </div>
            </div>
        </div>
<?php } 

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
    
    function MostrarConsultaLicitacion($idLicitacion, $idConsulta, $listadoErrores)
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
            $selectSql.= " WHERE (Id = ? AND NOT Eliminada)";
                   
            $consulta = $conexion->prepare($selectSql);
            $consulta->bind_param(('i'), $idConsulta);
            
            if($consulta->execute())
            {                
                $consulta->bind_result($Id, $Asunto, $textoConsulta, $FechaHoraConsulta, $PoseeRespuesta, $Respuesta, $FechaHoraRespuesta, $nom_usu, $ap_usu, $FechaUltimaModificacion);
                 
                while($consulta->fetch())
                {
                    MostrarContenidoConsultaLicitacion($Id, $Asunto, $textoConsulta, $FechaHoraConsulta, $PoseeRespuesta, $Respuesta, $FechaHoraRespuesta, $nom_usu, $ap_usu, $FechaUltimaModificacion, $idLicitacion, $idConsulta, $listadoErrores);
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
    
    function MostrarContenidoConsultaLicitacion($id, $asunto, $consulta, $fechaHoraConsulta, $poseeRespuesta, $respuesta, $fechaHoraRespuesta, $nombreUsuario, $apellidoUsuario, $fechaUltimaModif, $idLicitacion, $idConsulta, $listadoErrores)
    {
        $usuario = $apellidoUsuario . ", " . $nombreUsuario;
        ?>
        <div class="BloqueConsulta">
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
                <?php } 
                if(!$poseeRespuesta) { ?>
                        <div class="ContenedorFormularioRespuesta">
                            <?php CargarFormularioRegistrarRespuesta($idLicitacion, $idConsulta) ?>
                        </div>
                    <?php } else { ?>
                        <div class="ContenedorFormularioRespuesta">
                            <?php CargarFormularioModificarRespuesta($idLicitacion, $idConsulta) ?>
                        </div>
                    <?php } ?>
                <?php MostrarListadoMensajesDeError($listadoErrores); ?>
    <?php }    

    function CargarFormularioRegistrarRespuesta($idLicitacion, $idConsulta){ ?>
        <p class="Titulo">Respuesta</p> 
        <form class="FormularioRespuesta" action="formularioConsulta.php" method="post">
                <input type="hidden" name="accion" value="registrar" /> 
                <input type="hidden" name="IdLicitacion" value="<?php echo($idLicitacion); ?>" /> 
                <input type="hidden" name="IdConsulta" value="<?php echo($idConsulta); ?>" />                     
                <textarea name="respuesta" id="txtRespuesta<?php echo($idConsulta); ?>" class="TextoMultilinea" rows="4" cols="50"><?php if(isset($_POST["respuesta"])) { echo($_POST["respuesta"]); }?></textarea>
                <input type="submit" id="submitButtonResponder<?php echo($idConsulta); ?>" class="submitButtonResponder" style="display: none;" name="submitButton" value="Responder" />
                <div class="ContenedorBoton"><a id="lnkResponder<?php echo($idConsulta); ?>" class="BotonResponder" href="#">Responder</a></div>
        </form>
        <?php }
    
    function CargarFormularioModificarRespuesta($idLicitacion, $idConsulta) { ?>
        <p class="Titulo">Modificación de la respuesta</p> 
        <form class="FormularioRespuesta" action="formularioConsulta.php" method="post">
                <input type="hidden" name="accion" value="modificar" /> 
                <input type="hidden" name="IdLicitacion" value="<?php echo($idLicitacion); ?>" /> 
                <input type="hidden" name="IdConsulta" value="<?php echo($idConsulta); ?>" />                     
                <textarea name="respuesta" id="txtRespuesta<?php echo($idConsulta); ?>" class="TextoMultilinea" rows="4" cols="50"><?php if(isset($_POST["respuesta"])) { echo($_POST["respuesta"]); }?></textarea>
                <input type="submit" id="submitButtonResponder<?php echo($idConsulta); ?>" class="submitButtonResponder" style="display: none;" name="submitButton" value="Responder" />
                <div class="ContenedorBoton"><a id="lnkResponder<?php echo($idConsulta); ?>" class="BotonResponder" href="#">Responder</a></div>
            </form>
    <?php }
    
    function RegistrarRespuesta($idUsuario ,$idConsulta, $respuesta)
    {
        try
        {
            $fechaHoraActual = date("Y-m-d H:i:s");
            
            if($conexion = getConexionMysqli())
            {   
                $updateSql = "UPDATE Consulta SET PoseeRespuesta = 1, Respuesta = ?, ";
                $updateSql.= " FechaHoraRespuesta = ?, IdUsuarioRespuesta = ?";
                $updateSql.= " WHERE Id = ?";
                
                $consulta = $conexion->prepare($updateSql);
                $consulta->bind_param(('ssii'), $respuesta, $fechaHoraActual, $idUsuario, $idConsulta);
                
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
    
    function RegistrarModificacionRespuesta($idUsuario ,$idConsulta, $respuesta)
    {
        try
        {
            $fechaHoraActual = date("Y-m-d H:i:s");
            if($conexion = getConexionMysqli())
            {   
                $updateSql = "UPDATE Consulta SET Respuesta = ?,";
                $updateSql.= " FechaUltimaModificacion = ?, IdUsuarioRespuesta = ?";
                $updateSql.= " WHERE Id = ?";
                
                $consulta = $conexion->prepare($updateSql);
                $consulta->bind_param(('ssii'), $respuesta, $fechaHoraActual, $idUsuario, $idConsulta);
                
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
    
    function ValidarCamposRegistrarRespuesta($respuesta, &$listadoErrores)
    {
        $camposValidos = true;
        if($respuesta == "")
        {
            $camposValidos = false;
            $listadoErrores[] = "Campos faltantes: Texto de la respuesta de la consulta";
        }
        else
        {
            if(!ValidarCamposRespuesta($respuesta))
            {
                $camposValidos = false;
                $listadoErrores[] = "Campos no válidos: La respuesta debe tener una cantidad mayor de 20 caracteres y menor de 5000 caracteres";
            }            
        }
        return $camposValidos;
    }
    
    function ValidarCamposRespuesta($respuesta)
    {   
        $campoValido = false;
        if ((strlen($respuesta) >= 20) && (strlen($respuesta) <= 4900))
        {
            $campoValido = true;
        }
        return $campoValido;            
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
    
    function RedireccionarPaginaLicitaciones($idLicitacion)
    {
        echo "<script language='javascript'>window.location='main.php'</script>";
//        $url_consultas = "http://www.enohsa.gob.ar/licitaciones/respuestas/main.php";
//        header('Location: ' . $url_consultas);   
    }
    
    
?>



<header>
    <br>
    <nav style="height: 220px;">
            <div>
            <div class="contenido limitar clearfix">
                <ul class="rectangulo_cabecera">
                    <li>
                        <a href="../index.php">
                            <img src="/images/Logo ENOHSA/LOGO_ENOHSA.png" title="Ente Nacional de Obras H�dricas de Saneamiento" alt="Ente Nacional de Obras H�dricas de Saneamiento" class="logo" >
                        </a>  
                    </li>                      
                </ul>
                <ul class="rectangulo_cabecera">
                    <li>
                        <div class="limitarfecha">
                        <font size="1">
                            <script languaje="JavaScript"> 
                                var mydate=new Date() 
                                var year=mydate.getYear() 
                                if (year < 1000) 
                                year+=1900 
                                var day=mydate.getDay() 
                                var month=mydate.getMonth() 
                                var daym=mydate.getDate() 
                                if (daym<10) 
                                daym="0"+daym 
                                var dayarray=new Array("Domingo,","Lunes,","Martes,","Mi�rcoles,","Jueves,","Viernes,","S�bado,")
                                var montharray=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre")
                                document.write("<font color='Grey' face=''Roboto'sans-serif' style='font-size:10pt'>"+dayarray[day]+" "+daym+" de "+montharray[month]+" de "+year+"</font>") 
                            
                                
                            
                            </script>
                        </font> 
                        </div>
                    </li>    
                </ul>
                
            </div>
            <?php
                session_start(); 
                                
                if($_SESSION["IdPerfilUsuarioLicitaciones"]=="1")
                    {
                        $displaylic     = 'block';
                        $displaycompras = 'block';
                        $displaycon     = 'block';
                        $displaycon2    = 'block';
                        $displayamb     = 'block';
                    }
                else if ($_SESSION["IdPerfilUsuarioLicitaciones"]=="2")
                    {
                        $displaylic     = 'none';
                        $displaycompras = 'block';
                        $displaycon     = 'none';
                    }    
                 else if ($_SESSION["IdPerfilUsuarioLicitaciones"]=="3")
                    {
                        $displaylic     = 'block';
                        $displaycompras = 'none';
                        $displaycon     = 'block';
                    }   
                else if ($_SESSION["IdPerfilUsuarioLicitaciones"]=="4")
                    {
                        $displaylic     = 'none';
                        $displaycompras = 'none';
                        $displaycon     = 'none';
                        $displaycon2    = 'block';
                    }    
                else if ($_SESSION["IdPerfilUsuarioLicitaciones"]=="5")
                    {
                        $displaylic     = 'none';
                        $displaycompras = 'none';
                        $displaycon     = 'none';
                        $displaycon2    = 'none';
                        $displayamb     = 'block';
                    }         
            ?>
                        
            <div class="limitar" style="margin-left: 10px; margin-top: 20px;">
                 <ul class="nave">
                                  
                     <li <?php if(basename($_SERVER['PHP_SELF']) == 'licitaciones_listado.php' or basename($_SERVER['PHP_SELF']) == 'licitaciones_alta.php'  ){ echo "class='active'";}?> style="display: <?php echo $displaylic; ?>">
                        <a href="/licitaciones/licitaciones/licitaciones_listado.php">LICITACIONES OBRAS</a>
                    </li>
                    <li <?php if(basename($_SERVER['PHP_SELF']) == 'licitacionesCyC_alta.php' or basename($_SERVER['PHP_SELF']) == 'licitacionesCyC_listado.php'){ echo "class='active'";}?> style="display: <?php echo $displaycompras; ?>">
                        <a href="/licitaciones/licitaciones_CyC/licitacionesCyC_listado.php">LICITACIONES COMPRAS</a>
                    </li>
                    <li <?php if(basename($_SERVER['PHP_SELF']) == 'prensa_alta.php' or basename($_SERVER['PHP_SELF']) == 'prensa_modificacion.php' or basename($_SERVER['PHP_SELF']) == 'prensa_listado.php'){ echo "class='active'";}?> style="display: <?php echo $displaycon2; ?>">
                        <a href="/licitaciones/prensa/prensa_listado.php">NOTICIAS</a>
                    </li>
                    <li <?php if(basename($_SERVER['PHP_SELF']) == 'carpeta_prensa_alta.php' or basename($_SERVER['PHP_SELF']) == 'carpeta_prensa_modificacion.php' or basename($_SERVER['PHP_SELF']) == 'carpeta_prensa_listado.php'){ echo "class='active'";}?> style="display: <?php echo $displaycon2; ?>">
                        <a href="/licitaciones/carpeta_prensa/carpeta_prensa_listado.php">CARPETAS PRENSA</a>
                    </li>
                    <li <?php if(basename($_SERVER['PHP_SELF']) == 'convenios_listado.php' or basename($_SERVER['PHP_SELF']) == 'convenios_alta.php' or basename($_SERVER['PHP_SELF']) == 'convenios_modificacion.php'){ echo "class='active'";}?> style="display: <?php echo $displaycon2; ?>">
                        <a href="/licitaciones/convenios/convenios_listado.php">CONVENIOS</a>
                    </li>
                    <li <?php if(basename($_SERVER['PHP_SELF']) == 'ambiental_alta.php' or basename($_SERVER['PHP_SELF']) == 'ambiental_modificacion.php' or basename($_SERVER['PHP_SELF']) == 'ambiental_listado.php'){ echo "class='active'";}?> style="display: <?php echo $displayamb; ?>">
                        <a href="/licitaciones/ambiental/ambiental_listado.php">AMBIENTAL</a>
                    </li>
                    <li <?php if(basename($_SERVER['PHP_SELF']) == 'main.php'){ echo "class='active'";}?>style="display: <?php echo $displaycon; ?>">
                            <a href="/licitaciones/respuestas/main.php">CONSULTAS</a>
                    </li>
                    
                </ul>
                </div>
                
	</nav>
</header>
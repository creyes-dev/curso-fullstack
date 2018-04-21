<?php

	$base_url = 'http://localhost/wallsconsultores/';
	// $base_url = 'http://www.estudiocukier.com/clientes/wallsconsultores/';


// Encabezado
	echo '
		<div id="fb-root"></div>
		<script>
		</script>

		<div id="header" class="clearAfter">
			<div class="pageWidth clearAfter">
				<h1><a class="hideText" href="index.php">Walls Consultores</a></h1>
									
				<ul>
					<li class="active"><a href="'.$base_url.'admin_propiedad.php">Administración</a>
				</ul>
				<a href="#" class="sesion">Cerrar Sesión</a>
			</div>
		</div>';
?>
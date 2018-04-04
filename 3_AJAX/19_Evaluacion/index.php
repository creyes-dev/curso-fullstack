<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Evaluación Módulo 02 – Unidad 03</title>
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="jquery-ui-1.8.12.custom.min.js"></script>

<script type="text/javascript">
    $(document).ready(function(){
		
		function actualizarMaterias(){
			var carreraSeleccionada = $("select.carrera").val();
			var urlRecurso = 'cargarMaterias.php?carrera=' + carreraSeleccionada;
		
			$.getJSON(urlRecurso, function(datos){
				var html = '';
				var longitud = datos.length;
				for (var i = 0; i<longitud; i++){
					html += '<option value="' + datos[i].id + '">' + datos[i].nombre + '</option>';
				}
				$('select.materia').html(html);
			});
		}
		
		$("select.carrera").change(function () {
			actualizarMaterias();
		});
		
        $.getJSON('cargarCarreras.php', function(datos){
            var html = '';
            var longitud = datos.length;
            for (var i = 0; i<longitud; i++) {
                html += '<option value="' + datos[i].id + '">' + datos[i].nombre + '</option>';
            }
            $('select.carrera').append(html);
			actualizarMaterias();
        });
    });
</script>
</head>

<body>
<div class="contenido">
    <p>Carrera: </p>
    <select class="carrera"></select> 
    
    <p>Materias: </p>
    <select class="materia"></select> 
</div>

</body>
</html>
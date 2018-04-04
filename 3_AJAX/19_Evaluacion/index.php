<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Evaluación </title>
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="jquery-ui-1.8.12.custom.min.js"></script>

<script type="text/javascript">
    $(document).ready(function(){
        
        $.getJSON('cargarCarreras.php', function(data){
            var html = '';
            var len = data.length;
            for (var i = 0; i< len; i++) {
                html += '<option value="' + data[i].id + '">' + data[i].nombre + '</option>';
            }
            $('select.carrera').append(html);
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
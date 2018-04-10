<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Evaluación Módulo II - Unidad IV</title>
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script>
$( document ).ready(function() {
	$("#imagen").submit(function(e) {
 
		var formObj = $(this);
		var formURL = formObj.attr("action");
		var formData = new FormData(this);
		$.ajax({
			url: formURL,
			type: 'POST',
			data:  formData,
			mimeType:"multipart/form-data",
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				$('#contenido').append(data);
			}         
		});
		e.preventDefault(); //Prevent Default action.
	});
});
</script>
</head>
<body>
<form id="imagen" action="subearchivo.php" method="post" enctype="multipart/form-data">
    <b>Campo de tipo texto:</b>
    <br>
    <input type="text" name="cadenatexto" size="20" maxlength="100">
    <input type="hidden" name="MAX_FILE_SIZE" value="100000">
    <br>
    <br>
    <b>Enviar una imagen: </b>
    <br>
    <input name="userfile" type="file">
    <br>
    <input type="submit" value="Enviar">
</form> 
<div id="contenido">

</div>
</body>
</html>

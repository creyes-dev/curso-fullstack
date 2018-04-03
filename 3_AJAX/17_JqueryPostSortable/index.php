<?php 
include("conexion.php");

$query = mysqli_query($cn, "SELECT * FROM articulos ORDER BY orden_articulo");

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title> Ordenar registros con Ajax y efecto Drag'n Drop</title>
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="jquery-ui-1.8.12.custom.min.js"></script>

<style type="text/css">

body{ 
	margin:0; 
	padding:0
}
.cabecera{
     background: #4A3C31;
     border-bottom: 5px solid #69AD3C;
     width: 100%;
	 color: white;
	 text-align: center;
	 font:normal 12px Verdana, Geneva, sans-serif;
	 padding-top: 10px;
	 padding-bottom: 10px;
 }
.cabecera img{ 
     margin:40px 0 0 30px;
 }
.content{
	padding-top:20px;
	width:320px;
	margin:0 auto;
}
ul{
	list-style:none;
	margin:0;
	padding:0
}
ul li{
	display:block;
	background:#F6F6F6;
	border:1px solid #CCC;
	color:#3594C4;
	margin-top:3px;
	height:20px;
	padding:3px;
}
.ui-state-highlight{ background:#FFF0A5; border:1px solid #FED22F}
.msg{
	color:#0C0;
	font:normal 11px Tahoma
}

</style>
<script type="text/javascript">
$(document).ready(function(){
	$("ul#articulos").sortable({ placeholder: "ui-state-highlight",opacity: 0.6, cursor: 'move', update: function() {
		var order = $(this).sortable("serialize");
		$.post("order.php", order, function(respuesta){
			$(".msg").html(respuesta).fadeIn("fast").fadeOut(2500);
		});
	}
	});
});</script>
</head>

<body>
<div class="cabecera">
	Ordenar registros con Ajax y efecto Drag'n Drop
</div>

<div class="content">
	<h3>Articulos</h3>
    
	<ul id="articulos">
    	<?php 
		while($row = mysqli_fetch_array($query))
		{
			?>
			<li id="articulo-<?php echo $row['id_articulo'] ?>"><?php echo $row['nombre_articulo'] ?></li>
			<?php
		}
		?>
    </ul>
    <div class="msg"></div>
</div>

</body>
</html>
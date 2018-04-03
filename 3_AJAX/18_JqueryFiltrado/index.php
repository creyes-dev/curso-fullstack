<?php 
include("conexion.php")
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Filtro en tabla mysql con ajax php & mysql</title>
<link rel="stylesheet" type="text/css" href="assets/css/style.css"/>
<style type="text/css">
	/* CSS demo */
	#content{
		padding:20px 0 0 10px
	}
	#content .filtro{
		overflow:hidden;
		padding-bottom:15px
	}
	#content .filtro select{
		width:100px
	}
	#content .filtro ul{
		list-style:none;
		padding:0
	}
	#content .filtro li{
		float:left;
		display:block;
		margin:0 5px
	}
	#content .filtro li a{
		color:#006;
		position:relative;
		top:5px;
		text-decoration:underline
	}
	#content .filtro li label{
		float:left;
		padding:4px 5px 0 0
	}
	#content table{
		border-collapse:collapse;
		width:940px;
	}
	#content table th{
		border:1px solid #999;
		padding:8px;
		background:#F8F8F8
	}
	#content table th span{
		cursor:pointer;
		padding-right:12px
	}
	#content table th span.asc{
		background:url(assets/imgs/sorta.gif) no-repeat right center;
	}
	#content table th span.desc{
		background:url(assets/imgs/sortd.gif) no-repeat right center;
	}
	#content table td{
		border:1px solid #999;
		padding:6px
	}
	
</style>
<link rel="stylesheet" type="text/css" href="assets/jqueryui/css/smoothness/jquery-ui-1.8.16.custom.css"/>

<script type="text/javascript" src="assets/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="assets/jqueryui/js/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="assets/js/js.js"></script>

</head>
<body>
	<div id="top">
		Filtro en tabla mysql con ajax php & mysql
    </div>
	<div id="content">
        <div class="filtro">
        	<form id="frm_filtro" method="post" action="">
                <ul>
                    <li><label>Nacimiento: &nbsp;&nbsp; del</label> 
                    	<input type="text" name="del" id="del" size="15" class="datepicker" /> 
                        al 
                        <input type="text" name="al" id="al" size="15" class="datepicker" /></li>
                    <li><label>Nombre/Email:</label> <input type="text" name="nombre_email" size="25" /></li>
                    <li><label>Pais:</label>
                        <select name="pais">
                            <option value="0">--</option>
                            <!-- Listar Paises -->
                            <?php
                            $query = mysqli_query($cn, "SELECT * FROM pais"); 
                            while($row = mysqli_fetch_array($query)){
                                ?>
                                <option value="<?php echo $row['id_pais'] ?>">
                                    <?php echo $row['nombre_pais'] ?>
                                </option>
                                <?php
                            }
                            ?>
                        </select>                	
                    </li>
                    <li>
                    	<button type="button" id="btnfiltrar">Filtrar</button>
                    </li>                
                    <li>
                    	<a href="javascript:;" id="btncancel">Todos</a>
                    </li>
                </ul>
            </form>
        </div>
        <table cellpadding="0" cellspacing="0" id="data">
        	<thead>
            	<tr>
                    <th width="22%"><span title="nacimiento">Fecha Nacimiento</span></th>
                    <th width="35%"><span title="nombre">Nombre</span></th>
                    <th width="30%"><span title="email">Email</span></th>
                    <th><span title="nombre_pais">Pais</span></th>
                </tr>
            </thead>
            <tbody>
            	
            </tbody>
        </table>
	</div>    
</body>
</html>
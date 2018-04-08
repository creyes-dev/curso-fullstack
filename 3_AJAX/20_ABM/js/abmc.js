 	$(document).ready(function(){ 
		cargar_all();			
	})
	jQuery.fn.reset = function () {
	  $(this).each (function() { this.reset(); });
	}		
	function cargar_all(){
		$.ajax({
		  type: "POST",
		  url: "php-pdo/mostrar.php",
		  "success":function(data){
		   $('#content').html(data);	
		  }
		  });
	}	
	function guardar(){
		$.ajax({
		  type: "POST",		
		  url: "php-pdo/guardar.php",
		  data: {
		  nombre : $('#nombre').val(),
		  apellido : $('#apellido').val(),
		  fecha : $('#fecha').val()
		  },
		  "success":function(data){
		  	$('#clientx').reset();
			$('#block').hide();
			$('#popupbox').hide();
			cargar_all();	
		  }
		});
	}	
	function modificarr(){
		$.ajax({	
		  type: "POST",
		  url: "php-pdo/modificar.php",
		  data: {
		  nombre : $('#nombre').val(),
		  apellido : $('#apellido').val(),
		  fecha : $('#fecha').val(),
		  id : $('#id').val()
		  },
		  "success":function(data){
			$('#clientx').reset();
			$('#block').hide();
			$('#popupbox').hide();
			cargar_all();	
		  }		  
		});
	}
	function borrar(id){
		$.ajax({
		  type: "POST",		
		  url: "php-pdo/borrar.php",
		  data: {id : id},
		  "success":function(data){
		  cargar_all();
		  }
		  });
	}
	function editar(id,nombre,apellido,fecha){
		$('#popupbox').show();
		$('#modificar').show();
		$('#agregar').hide();
		$('#block').show();
		 $('#id').val(id);
		 $('#nombre').val(nombre);
		 $('#apellido').val(apellido);
		 $('#fecha').val(fecha);
		
	}
	function agregar(){
		$('#modificar').hide();
		$('#agregar').show();		
		$('#popupbox').show();
		$('#block').show();
	}
// JavaScript Document

var canal;
function mostrarMaterias() {

	var codigo=document.getElementById('carreras').value;
	if (codigo!=0)
	{
		canal = create_ajax();
		canal.onreadystatechange = handler_usuario;
		canal.open('GET','pagina1.php?cod='+codigo, true);
		canal.send(null);
	}
	else
	{
		var select2=document.getElementById('materias');
		select2.options.length=0;
	}

}


function handler_usuario() {
	if (canal.readyState == 4) {
		if(canal.status != 200) { alert('Error de conexión al servidor'); return; }
		
		var d=document.getElementById('espera');
		d.innerHTML = '';
		var xml = canal.responseXML;
		var pals=xml.getElementsByTagName('materia');
		var select2=document.getElementById('materias');
		select2.options.length=0;
		for(f=0;f<pals.length;f++)
		{
		  var op=document.createElement('option');
		  var texto=document.createTextNode(pals[f].firstChild.nodeValue);
		  op.appendChild(texto);
		  select2.appendChild(op);
		} 
	} 
	else 
	{
		var d=document.getElementById('espera');
		d.innerHTML = '<img src="loader.gif">';  
	}			
}


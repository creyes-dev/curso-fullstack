<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Documento sin t&iacute;tulo</title>
<script src="js/jquery-1.9.1.js"></script>
<script src="js/jquery-ui-1.10.3.custom.js"></script>
<link href="css/ui-lightness/jquery-ui-1.10.3.custom.css" rel="stylesheet">
<meta charset="utf-8">
	<style>
	.ui-autocomplete-loading { background: white url('images/ui-anim_basic_16x16.gif') right center no-repeat; }
	</style>
	<script>
	$(function() {
		function log( message ) {
			$( "<div/>" ).text( message ).prependTo( "#log" );
			$( "#log" ).scrollTop( 0 );
		}

		$( "#calles" ).autocomplete({
			source: "buscar-autocompletar.php",
			minLength: 3,
			select: function( event, ui ) {
				log( ui.item ?
					"Selected: " + ui.item.value + " aka " + ui.item.label :
					"Nothing selected, input was " + this.value );
			}
		});
	});
	</script>

</head>

<body>
<div class="demo">

<div class="ui-widget">
	<label for="calles">Seleccione la calle: </label>
	<input id="calles" name="calles" />
</div>

<div class="ui-widget" style="margin-top:2em; font-family:Arial">
	Result:
	<div id="log" style="height: 200px; width: 300px; overflow: auto;" class="ui-widget-content"></div>
</div>

</div><!-- End demo -->



<div class="demo-description">
<p>The Autocomplete widgets provides suggestions while you type into the field. Here the suggestions are bird names, displayed when at least two characters are entered into the field.</p>
<p>The datasource is a server-side script which returns JSON data, specified via a simple URL for the source-option. In addition, the minLength-option is set to 2 to avoid queries that would return too many results and the select-event is used to display some feedback.</p>
</div><!-- End demo-description -->
</body>
</html>

function create_ajax()  /* ajax function*/
{
	var creation;

	/*@cc_on
	@if (@_jscript_version >= 5)
	try
	{ creation = new ActiveXObject("Msxml2.XMLHTTP");}
	catch (e)
	{ try {	creation = new ActiveXObject("Microsoft.XMLHTTP");}
	catch (e) {	creation = false; } }
	@else creation = false;
	@end @*/

	if (!creation && typeof XMLHttpRequest != 'undefined')
	{try{ creation = new XMLHttpRequest(); } catch (e)
		{ creation = false;	}	}
	return creation;
} 

<!-- ******************************************************************
[Index start-page]

Project:		Thea 
Version:		2.0
Last change:	31/08/2015
Author:			Øystein Molnes
Primary use:	This page is displayed when an entry has been completed
*********************************************************************** -->

<!DOCTYPE html>
<html>
<head>
	<!-- Insert view for the head -->
	<?php require("view_components/head.php"); ?>

	<script> 
	$( document ).ready(function() {
		completeEntry();
	}
	</script>
</head>

<body>

	<div class="ui container center">

		<h1 class="ui center aligned icon blue header">
			<i class="circular checkmark icon"></i>
			Takk for at du meldte deg på!
		</h1>

		<p>Din påmelding er nå fullført, og du vil om kort tid motta en bekreftelsesmail med kvittering på eposten du oppga under påmeldingen. 
		Bekreftelsesmailen vil også inneholde brukernavn og passord for innlogging til din deltakerside.</p>

	</div>
</body>
</html>
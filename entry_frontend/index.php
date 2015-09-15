<!-- ******************************************************************
[Index start-page]

Project:		Thea 
Version:		2.0
Last change:	11/08/2015
Author:			Øystein Molnes
Primary use:	Start page for the entry sites. Allows users to 
				select ticket type.
*********************************************************************** -->

<!DOCTYPE html>
<html>
<head>
	<!-- Insert view for the head -->
	<?php require("view_components/head.php"); ?>
</head>

<body>

	<div class="ui container center">
		<div class="ui huge header">Påmelding SL Tromsø 2016</div>
		<div class="ui grid">
			<div class="computer only four wide column"></div>
			<div class="four wide computer twelve wide mobile column">
				<a href="entry_participant.php">
					<button class="ui blue button">Meld på deltaker</button>
				</a>
			</div>

			<div class="four wide computer twelve wide mobile column">
				<a href="entry_team.php">
					<button class="ui blue button">Meld på lag</button>
				</a>
			</div>
			<div class="computer only four wide computer column"></div>
		</div>
		<img class="ui centered medium image" src="img/sltromso.png">
	</div>
</body>
</html>
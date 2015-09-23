<!DOCTYPE html>
<!-- ******************************************************************
[Index start-page]

Project:		Thea 
Version:		2.0
Last change:	11/08/2015
Author:			Øystein Molnes
Primary use:	Start page for the entry sites. Allows users to 
				select ticket type.
*********************************************************************** -->

<html>
<head>
	<!-- Insert view for the head -->
	<?php require("view_components/head.php"); ?>
</head>

<body>
		<div class="ui container">
			<div class="ui center aligned grid">
				<div class="ui four wide column">
						<img class="ui image" src="img/sltromso.png" alt="SL Tromsø 2016">
				</div>
				<div class="ui fourteen wide column">
					<div class="ui huge header">
						Påmelding SL Tromsø 2016
					</div>
				</div>
				<div class="ui row">
						<button class="ui blue button" onclick="location.href='entry_participant.php'">Meld på deltaker</button>
						<button class="ui blue button" onclick="location.href='entry_team.php'">Meld på lag</button>
				</div>
			</div>
	</div>
	<div class="footer">
		<div class="ui four column grid">
			<div class="column center aligned"><img src="http://sltromso.no/wp-content/themes/zerif-pro/images/map25-redish.png" alt="Hvor"><br>Tromsø, Norge</div>
			<div class="column center aligned"><img src="http://sltromso.no/wp-content/themes/zerif-pro/images/envelope4-green.png" alt="Epost"><br>post@sltromso.no</div>
			<div class="column center aligned"><img src="http://sltromso.no/wp-content/themes/zerif-pro/images/telephone65-blue.png" alt="Telefon"><br>97002717</div>
			<div class="column center aligned"><i class="big facebook icon"></i><br>SLTROMSØ2016</div>
		</div>
	</div>
</body>
</html>

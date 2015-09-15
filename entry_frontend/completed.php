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
	var RESPONSE_CODE = "responseCode";
	var TRANSACTION_ID = "transactionId";

	function error(transactionId, errorMsg) {
		if (transactionId != null)
			terminateEntry(transactionId);

		$("#wait").hide();

		$("#errorMsg").text(errorMsg);
		$("#error").show();
	}

	function success() {
		$("#wait").hide();
		$("#success").show();
	}

	$( document ).ready(function() {
		var responseCode = GetURLParameter(RESPONSE_CODE);
		var transactionId = GetURLParameter(TRANSACTION_ID);
		if (responseCode == null || transactionId == null) {
			error(transactionId, "Mangler GET-parameter '" + RESPONSE_CODE + "' og/eller '" + TRANSACTION_ID + "'.");
		} else if (responseCode != "OK") {
			error(transactionId, "Betalingen ble avbrutt av kjøperen.");
		} else {
			completeEntry(transactionId, function(data) {
				if (data != null && "entry_id" in data) {
					success();
				} else {
					error(transactionId, "En uventet feil oppsto. Hvis problemet vedvarer, ber vi deg ta kontakt med arrangøren.");
				}
			}, function(errorMsg) {
				error(transactionId, errorMsg);
			});
		}
	});
	</script>
</head>

<body>

	<div class="ui container center">
		<div id="wait">
			<h1 class="ui center aligned icon blue header">
				<i class="circular wait icon"></i>
				Fullfører påmeldingen...
			</h1>

			<p>Påmeldingen din fullføres i dette øyeblikk. Ikke naviger bort i fra denne siden før du har fått bekreftelse.</p>
		</div>
		<div id="success" hidden>
			<h1 class="ui center aligned icon blue header">
				<i class="circular checkmark icon"></i>
				Takk for at du meldte deg på!
			</h1>

			<p>Din påmelding er nå fullført, og du vil om kort tid motta en bekreftelsesmail med kvittering på eposten du oppga under påmeldingen. 
			Skulle du ha noen andre spørsmål, ber vi deg ta kontakt med arrangøren.</p>
		</div>
		<div id="error" hidden>
			<h1 class="ui center aligned icon red header">
				<i class="circular remove icon"></i>
				Upsi, noe gikk galt!
			</h1>

			<p>Påmeldingen din ble ikke fullført, grunnet problemer med betalingen din. Frykt ikke; ingen penger har blitt trukket fra din bankkonto.
			Skulle problemet vedvare, ber vi deg ta kontakt med arrangøren av idrettsarrangementet. Et forsøk på mer detaljert beskrivelse av feilen finner du under.</p>
			<br>
			<p id="errorMsg"></p>
		</div>
	</div>
</body>
</html>
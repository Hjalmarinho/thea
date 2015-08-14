<?php require('header.php'); ?>

<div class="ui grid">

	<div class="ten wide column" >
		<table id="accreditations" class="ui sortable celled striped compact table" style="cursor: pointer">
			<thead>
				<tr>
					<th>Fornavn</th>
					<th class="ascending">Etternavn</th>
					<th>Klubb</th>
				</tr>
			</thead>
			<tbody id="accreditations_body">				

			</tbody>
		</table>
	</div> <!-- /table column -->

	<div class="six wide column" >
		<div class="ui special cards">
			<div class="card" id="accreditant_card" style="display: none">
				<div class="blurring dimmable image">
					<div class="ui dimmer">
						<div class="content">
							<div class="center">
								<div class="ui inverted button" onclick="accreditateParticipant()">Akkrediter</div>
							</div>
						</div>
					</div>
					<img src="http://semantic-ui.com/images/avatar/large/elliot.jpg">
				</div>
				<div class="content">
					<a class="header" id="card_name">Øystein Molnes</a>
					<div class="meta">
						<span class="date" id="time_registrated"></span>
					</div>
				</div>
				<div class="extra content" id="comment">
						Denne brukeren har ingen kommentar...
				</div>
			</div>
		</div>
	</div> <!-- /card column -->

</div> <!-- /ui grid -->

<?php require('footer.php'); ?>


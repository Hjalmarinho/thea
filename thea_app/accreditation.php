<?php require('header.php'); ?>

<div class="ui grid">

	<div class="ten wide column" >
		<table id="participants" class="ui sortable celled striped table" style="cursor: pointer">
			<thead>
				<tr>
					<th>Fornavn</th>
					<th class="ascending">Etternavn</th>
					<th>Klubb</th>
				</tr>
			</thead>
			<tbody id="participants_body">				

			</tbody>
		</table>
	</div> <!-- /table column -->

	<div class="six wide column" >
		<div class="ui special cards">
			<div class="card" id="participant_card" style="display: none">
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
				<div class="content" id="participant_content">
					<a class="header" id="card_name"></a>
					<div class="meta">
						<span class="date" id="card_time_registrated"></span>
					</div>
					<br>
					<p id="card_accreditated_mark" style="display:none"><i class="checkmark green icon"></i>Akkreditert</p>
				</div>
				<div class="extra content" id="card_comment"></div>
			</div>
		</div>
	</div> <!-- /card column -->

</div> <!-- /ui grid -->

<?php require('footer.php'); ?>


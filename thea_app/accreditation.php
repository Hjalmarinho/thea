<?php require('header.php'); ?>

<div class="ui grid">
	<!-- Search field -->
	<div class="row">
		<div class="ten wide column" >
			<!-- Search field -->
			<div class="ui icon input">
				<input type="text" id="search_input" placeholder="Søk...">
				<i class="search icon"></i>
			</div>
		</div>
	</div>

	<div class="ten wide column" >

		<!-- Participants table -->
		<table id="participants_table" class="ui sortable celled striped table" style="cursor: pointer" onclick="initiateSearch()">
			<thead>
				<tr>
					<th class="five wide ascending">Navn</th>
					<th class="ten wide">Klubb</th>
				</tr>
			</thead>
			<tbody id="participants_table_body">				

			</tbody>
		</table>
	</div> <!-- /table column -->

	<div class="six wide column" >

		<!-- Participant card -->
		<div class="ui sticky special cards">
			<div class="card" id="participant_card" style="display: none">
				<div class="blurring dimmable image">
					<div class="ui dimmer">
						<div class="content">
							<div class="center">
								<div id="button_accreditate" class="ui inverted green button" onclick="accreditateParticipant(true)">Akkrediter</div>
								<div id="button_unaccreditate" class="ui inverted red button" onclick="accreditateParticipant(false)">Avakkrediter</div>
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
				<div class="extra content">
					<div class="ui large transparent left icon input">
						<i class="comment outline icon"></i>
						<input type="text" placeholder="Skriv en kommentar..." id="card_comment">
					</div>
				</div>
				<div class="ui bottom attached button" id="button_comment" onclick="saveComment()">
					<i class="add icon"></i>
					Lagre kommentar
				</div>
			</div>
		</div>
	</div> <!-- /card column -->

</div> <!-- /ui grid -->

<?php require('footer.php'); ?>


<?php require('header.php'); ?>

<div class="ui grid">
	<div class="ten wide column">
		<table class="ui sortable celled striped compact table">
			<thead>
				<tr>
					<th>Fornavn</th>
					<th class="ascending">Etternavn</th>
					<th>Klubb</th>
				</tr>
			</thead>
			<tbody id="accreditations">
			</tbody>
		</table>
	</div>
	<div class="six wide column">
		<div class="ui special cards">
			<div class="card">
				<div class="blurring dimmable image">
					<div class="ui dimmer">
						<div class="content">
							<div class="center">
								<div class="ui inverted button">Akkrediter</div>
							</div>
						</div>
					</div>
					<img src="http://semantic-ui.com/images/avatar/large/elliot.jpg">
				</div>
				<div class="content">
					<a class="header">Øystein Molnes</a>
					<div class="meta">
						<span class="date" id="time_registrated"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<?php require('footer.php'); ?>


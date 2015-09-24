<?php require('header.php'); ?>

<div class="ui items">

	<div class="header">
		<!-- <i class="large sidebar icon" id="menubutton"></i> -->
		<h1 class="ui dividing teamname">Lag</h1>
	</div>

</div>

<div class="ui modal" id="approve-update">
  <div class="header">
    Er du sikker at du vil endre <span class="teamname"></span>?
  </div>
  <div class="content">
    Gjør det lettere å forstå hva som har skjedd, skriv en kommentar!
    <textarea rows="4" id="update-comment" style="max-width:100%;width:100%;"></textarea>
  </div>
  <div class="actions">
    <div class="ui button close">Avbryt</div>
    <div class="ui button close" onclick="updateParticipant()" >Oppdater</div>
  </div>
</div>

<div class="ui modal" id="cancel-modal">
  <div class="header">
    Er du sikker at du vil kansellere <span class="teamname"></span>?
  </div>
  <div class="content">
    Gjør det lettere å forstå hva som har skjedd, skriv en kommentar!
    <textarea rows="4" id="update-comment" style="max-width:100%;width:100%;"></textarea>
  </div>
  <div class="actions">
    <div class="ui button close">Avbryt</div>
    <div class="ui button close" onclick="updateParticipant()" >Oppdater</div>
  </div>
</div>

<div class="ui stackable two column grid">
	<div class="eight wide column">
		<div class="ui form" id="entry-form">

			<div class="inline fields">	
				<label class="field four wide">Navn</label>
				<div class="field nine wide">
					<input type="text" value="" id="team_name">
				</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">Idrett</label>
				<div class="field nine wide">
					<select class="ui fluid dropdown" id="sports">
					</select>
				</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">Øvelse</label>
				<div class="field nine wide">
					<select class="ui fluid dropdown" id="exercises">
					</select>
				</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">Klubb</label>
				<div class="field nine wide">
					<select class="ui fluid dropdown" id="clubs">
					</select>
				</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">Kjønn</label>
				<div class="field nine wide">
					<select class="ui fluid dropdown" id="selectgender">
						<option value="">Velg lagets kjønn</option>
						<option value="Female" >Dame</option>
						<option value="Male" >Herre</option>
						<option value="Mix" >Mix</option>
					</select>
				</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">Lagleder</label>
				<div class="field nine wide">
					<select class="ui fluid dropdown" id="teamleader">
						<option value="">Velg lagleder</option>
					</select>
				</div>
			</div>

		</div><!-- /.form -->
		<h4 class="ui dividing header">Lagmedlemmer</h4>
	<div class="ui fourteen wide column">
		
		<table class="ui very basic table">
			<tbody id="teammembers">

			</tbody>
		</table>

	</div>

	</div> <!-- /.ten.wide.column -->

	<div class="six wide column">

		<div class="ui special card">
				<div class="extra content">
					<textarea rows="4" id="comment" style="max-width:100%;width:100%;">Ingen kommentarer</textarea>
					
					<button class="fluid ui button" id="updateTeam">Oppdater laget</button>
					<div class="ui divider"></div>
					<button class="fluid red ui button" id="cancelTeam">Kanseller laget</button>
				</div>
		</div>

		<div class="field sixteen wide">				
		</div>
	</div> <!-- /.six.wide.column -->

<div class="row">
	<div class="fourteen wide column">
<!--
		<div class="ui segments">
			<div class="ui segment">
				<p>Erik Frøseth changed gender from male to female on 13 august 2015, kl. 12.10.43.</p>

			</div>
			<div class="ui segment">
				<p>Øystein Molnes added himself as a participant on 11 august 2015, kl. 11.00.00.</p>
			</div>
		</div>
	</div>
-->
</div>
</div>



<?php require('footer.php'); ?>
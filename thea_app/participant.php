<?php require('header.php'); ?>

<div class="ui items">

	<div class="header">
		<!-- <i class="large sidebar icon" id="menubutton"></i> -->
		<h1 class="ui dividing participantname">Deltaker</h1>
	</div>

</div>

<div class="ui modal" id="approve-update">
  <div class="header">
    Er du sikker at du vil endre <span class="participantname"></span>?
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

<div class="ui modal" id="credit-update">
  <div class="header">
    Er du sikker på at du vil refundere <span class="participantname"></span>?
  </div>
  <div class="content">
    Gjør det lettere å huske hvorfor du refunderte penger, skriv en kommentar!
    <textarea rows="4" id="update-comment" style="max-width:100%;width:100%;"></textarea>
  </div>
  <div class="actions">
    <div class="ui button close">Avbryt</div>
    <div class="ui button close" onclick="creditParticipant()" >Refunder</div>
  </div>
</div>

<div class="ui modal" id="cancel-modal">
  <div class="header">
    Er du sikker på at du vil kansellere <span class="participantname"></span>?
  </div>
  <div class="content">
    Gjør det lettere å huske hvorfor du kansellerte, skriv en kommentar!
    <textarea rows="4" id="cancel-comment" style="max-width:100%;width:100%;"></textarea>
  </div>
  <div class="actions">
    <div class="ui button close">Avbryt</div>
    <div class="ui button close" onclick="cancelParticipant()" >Kanseller</div>
  </div>
</div>

<div class="ui stackable two column grid">
	<div class="eight wide column">
		<div class="ui form" id="entry-form">

			<div class="inline fields">	
				<label class="field four wide">Fornavn</label>
				<div class="field nine wide">
					<input type="text" value="" id="first_name">
				</div>
			</div>
			
			<div class="inline fields">
				<label class="field four wide">Etternavn</label>
				<div class="field nine wide">
					<input type="text" value="" id="last_name">
				</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">Fødselsdato</label>
				<div class="field two wide">
					<input type="text" name="birthdate" id="birthday" placeholder="dd">
				</div>

				<div class="field four wide">
					<select class="ui fluid dropdown" id="birthmonth">
						<option value="">mm</option>
						<option value="Jan">januar</option>
						<option value="Feb">februar</option>
						<option value="Mar">mars</option>
						<option value="Apr">april</option>
						<option value="Mai">mai</option>
						<option value="Jun">juni</option>
						<option value="Jul">juli</option>
						<option value="Aug">august</option>
						<option value="Sep">september</option>
						<option value="Okt">oktober</option>
						<option value="Nov">november</option>
						<option value="Des">desember</option>
					</select>
				</div>

				<div class="field three wide">
					<input type="text" name="birthdate" id="birthyear" placeholder="yyyy">
				</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">Kjønn</label>
				<div class="field nine wide">
					<select class="ui fluid dropdown" id="selectgender">
						<option value="">Velg kjønn</option>
						<option value="Female" >Dame</option>
						<option value="Male" >Herre</option>
					</select>
				</div>
			</div>

			<div class="inline fields">
					<label class="field four wide">Student</label>
				<div class="ui fitted checkbox">
					<input type="checkbox" tabindex="0" id="studentCheckbox">
				</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">E-post</label>
				<div class="field nine wide">
					<input type="text" value="" id="email">
					</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">Telefonnummer</label>
				<div class="field nine wide">
					<input type="text" value="" id="phone">
				</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">Reiseinformasjon</label>
				<div class="field nine wide">
					 <input type="text" value="" id="travel_information">
				</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">Allergier</label>
				<div class="field nine wide">
					<input type="text" value="" id="allergies">
				</div>
			</div>

			<h4 class="ui dividing header">Deltakerinformasjon</h4>

			<div class="inline fields">
				<label class="field four wide">Klubb</label>
				<div class="field nine wide">
					<select class="ui fluid dropdown" id="clubs">
					</select>
				</div>
			</div>


			<div class="inline fields">
					<label class="field four wide">Medlem av klubb </label>
				<div class="ui checkbox">
					<input type="checkbox" tabindex="0" id="clubmemberCheckbox">
				</div>
			</div>

			<div class="inline fields">
					<label class="field four wide">Akkreditert</label>
				<div class="ui checkbox">
					<input type="checkbox" tabindex="0" class="hidden" id="accreditatedCheckbox">
				</div>
			</div>

			<h4 class="ui dividing header">Betaling</h4>
			
			<div class="inline fields">
				<label class="field four wide">Har betalt </label>
				<span class="field six wide">500,-</span>
			</div>

			<div class="inline fields">
				<label class="field four wide">Refundering</label>
				<div class="field six wide">
					<input type="text" value="" id="payment">
				</div>
				<div class="field five wide">
					<button class="ui button" id="creditParticipant">Refunder</button>
				</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">Blitt refundert </label>
				<span class="field six wide">250,-</span>
			</div>

		</div><!-- /.form -->
	</div> <!-- /.ten.wide.column -->

	<div class="six wide column">

		<div class="ui special card">
				<div class="blurring dimmable image">
					<div class="ui dimmer">
						<div class="content">
							<div class="center">
								<div class="ui inverted button">Last opp nytt bilde</div>
							</div>
						</div>
					</div>
					<img id="portrait" src="http://semantic-ui.com/images/avatar/large/elliot.jpg">
				</div>
				<div class="content">
					<a class="header participantname">Deltaker</a>
					<div class="meta">
						<span class="date" id="time_registrated"></span>
					</div>
				</div>
				<div class="extra content">
					<textarea rows="4" id="comment" style="max-width:100%;width:100%;">Ingen kommentarer</textarea>


					<button class="fluid ui button" id="updateParticipant">Oppdater deltakerinformasjon</button>
					<div class="ui divider"></div>
					<button class="fluid ui button" id="recieptParticipant">Deltakerens kvittering</button>
					<div class="ui divider"></div>
					<button class="fluid red ui button" id="cancelParticipant">Kanseller deltaker</button>
				</div>
		</div>

		<div class="field sixteen wide">				
			
		</div>
	</div> <!-- /.six.wide.column -->

<div class="row">
	<div class="fourteen wide column">

		<div class="ui segments">
			<div class="ui segment">
				<p>Erik Frøseth changed gender from male to female on 13 august 2015, kl. 12.10.43.</p>

			</div>
			<div class="ui segment">
				<p>Øystein Molnes added himself as a participant on 11 august 2015, kl. 11.00.00.</p>
			</div>
		</div>
	</div>

</div>
</div>



<?php require('footer.php'); ?>

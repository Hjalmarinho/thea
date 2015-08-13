<?php require('header.php'); ?>

<div class="ui items">

	<div class="header">
		<!-- <i class="large sidebar icon" id="menubutton"></i> -->
		<h1>Øystein Molnes</h1>
	</div>

</div>
<div class="ui grid">
	<div class="ui ten wide column">
		<div class="ui form" id="participantform">
		<div class="sixteen wide field">
			<div class="inline fields">	
				<div class="field">
					<label>Fornavn: </label>
					<input type="text" value="" id="first_name">
				</div><div class="field">
				<label>Etternavn: </label>
				<input type="text" value="" id="last_name">
			</div>
		</div>
		</div>

		<div class="inline fields">
			<div class="five wide field">
				<label>Fødselsdato: </label>
				<input type="text" name="birthdate" id="birthdate" placeholder="dd">
			</div>
			<div class="four wide field">
				<select class="ui fluid dropdown">
				<option value="">mm</option>
				<option value="AL">januar</option>
				<option value="AK">februar</option>
				<option value="AZ">mars</option>
				<option value="AR">april</option>
				<option value="AR">mai</option>
				<option value="AR">juni</option>
				<option value="AR">juli</option>
				<option value="AR">august</option>
				<option value="AR">september</option>
				<option value="AR">oktober</option>
				<option value="AR">november</option>
				<option value="AR">desember</option>
			</select>
				
			</div>
			<div class="three wide field">
				<input type="text" name="birthdate" id="birthdate" placeholder="yyyy">
				
			</div>
		</div>

		<div class="thirteen wide inline fields">
		<div class="field">
			<label>Kjønn</label>
			</div><div class="field">
			<select class="ui fluid dropdown" id="selectgender">
				<option value="">Velg kjønn</option>
				<option value="Female">Dame</option>
				<option value="Male">Herre</option>
			</select>
		</div>
		</div>

		<div class="inline fields">
			<div class="eight wide field">
				<label>Klubb: </label>
				<select class="ui fluid dropdown">
				<option value="">Velg klubb</option>
				<option value="AL">NTNUI</option>
				<option value="AK">TSI</option>
				<option value="AZ">OSI</option>
				<option value="AR">Studentspretten</option>
			</select>
			</div>
			
		</div>

		<div class="inline field">
			<div class="ui checkbox">
				<input type="checkbox" tabindex="0" class="hidden" id="accreditatedCheckbox">
				<label>Akkreditert</label>
			</div>
		</div>

		<div class="inline field">
			<div class="ui checkbox">
				<input type="checkbox" tabindex="0" class="hidden" id="studentCheckbox">
				<label>Student</label>
			</div>
		</div>

		<div class="inline field">
			<div class="ui checkbox">
				<input type="checkbox" tabindex="0" class="hidden" id="clubmemberCheckbox">
				<label>Medlem av <span id="club_name"></span></label>
			</div>
		</div>

		<div class="inline field">
			<label>Reiseinformasjon: </label>
			<input type="text" value="Reiser fra Ski på ski">
		</div>

		<div class="inline field">
			<label>Allergier: </label>
			<input type="text" value="Nei">
		</div>

		<div class="inline field">
			<label>E-post: </label>
			<input type="text" value="oystein.molnes@gmail.com">
		</div>

		<div class="inline field">
			<label>Telefonnummer: </label>
			<input type="text" value="987 65 432">
		</div>

		Har betalt: 550kr

	</div>
</div>

<div class="ui six wide column">
	<div class="ui special cards">
		<div class="card">
			<div class="blurring dimmable image">
				<div class="ui dimmer">
					<div class="content">
						<div class="center">
							<div class="ui inverted button">Last opp nytt bilde</div>
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
			<div class="extra content">
				<div class="ui star rating" data-rating="3"></div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="sixteen wide column">
			
	<button class="ui button">Oppdater</button>
		</div>
	</div>
</div>
<div class="row">
<div class="ten wide column">
	
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

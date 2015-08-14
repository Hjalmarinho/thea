<?php require('header.php'); ?>

<div class="ui items">

	<div class="header">
		<!-- <i class="large sidebar icon" id="menubutton"></i> -->
		<h1 class="participantname">Deltaker</h1>
	</div>

</div>
<div class="ui grid">
	<div class="ui ten wide column">
		<div class="ui form" id="entry-form">

			<div class="inline fields">	
				<label class="field four wide">Fornavn: </label>
				<div class="field nine wide">
					<input type="text" value="" id="first_name">
				</div>
			</div>
			
			<div class="inline fields">
				<label class="field four wide">Etternavn: </label>
				<div class="field nine wide">
					<input type="text" value="" id="last_name">
				</div>
			</div>

		

			<div class="inline fields">
				<label class="field four wide">Fødselsdato: </label>
				<div class="field two wide">
					<input type="text" name="birthdate" id="birthday" placeholder="dd">
				</div>

				<div class="field four wide">
					<select class="ui fluid dropdown" id="birthmonth">
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
				<label class="field four wide">Klubb: </label>
				<div class="field nine wide">
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

			<div class="inline fields">
				<label class="field four wide">Reiseinformasjon: </label>
				<div class="field nine wide">
					 <input type="text" value="" id="travel_information">
					
				</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">Allergier: </label>
				<div class="field nine wide">
					<input type="text" value="" id="allergies">
				</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">E-post: </label>
				<div class="field nine wide">
					<input type="text" value="" id="email">
					</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">Telefonnummer: </label>
				<div class="field nine wide">
					<input type="text" value="" id="phone">
				</div>
			</div>

			<div class="inline fields">
				<label class="field four wide">Betaling: </label>
				<div class="field six wide">
					<input type="text" value="" id="payment">
				</div>
				<div class="field five wide">
					<button class="ui button">Refunder</button>
				</div>
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
					<a class="header participantname">Deltaker</a>
					<div class="meta">
						<span class="date" id="time_registrated"></span>
					</div>
				</div>
				<div class="extra content">
					<span id="comment">Ingen kommentarer</span>
				</div>
			</div>
		</div>

		<div class="field sixteen wide">				
				<button class="ui button">Oppdater</button>

		</div>
	</div>

<div class="row">
	<div class="sixteen wide column">

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

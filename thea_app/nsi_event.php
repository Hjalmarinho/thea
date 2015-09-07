<?php require('header.php'); ?>

<div class="ui grid">
	<div class="column ten wide">
		<button class="ui icon button" onclick="showEventModal()">
			<i class="icon plus"></i>Opprett arrangement 
		</button>

		<div class="ui divider"></div>

		<select class="ui dropdown" id="events">
			<option value="">Velg studentidrettsarrangement</option>
		</select>

		<div class="ui buttons" style="margin-top: 50px;">
			<button class="ui button active">Akkreditering</button>
			<button class="ui button">Deltakere</button>
			<button class="ui button">Overnatting</button>
			<button class="ui button">Kommentarer</button>
			<button class="ui button">Bankett</button>
			<button class="ui button">Deltakermatrisa</button>
		</div>

	</div>
</div> <!-- /ui grid -->
<?php require('footer.php'); ?>


<div class="ui modal">
  <i class="close icon"></i>
  <div class="header">
    Opprett arrangement
  </div>
  <div class="content">
  <div class="ui container">
    <div class="ui grid">
      <div class="eight wide column">

        <form class="ui form" id="entry_form">

          <!-- ***************** Arrangør ******************** -->
          <div class="inline fields">
            <label class="field four wide">Arrangør</label>
            <div class="field twelve wide">
              <select class="ui search dropdown" name="event_organizer" id="event_organizer">
                <option value="">Hvilken klubb er arrangør?</option>
              </select>
            </div>
          </div>

          <!-- ***************** Type ******************** -->
          <div class="inline fields">
            <label class="field four wide">Type</label>
            <div class="field twelve wide">
              <select class="ui search dropdown" name="event_type" id="event_type">
                <option value="">Hva slags arrangement er det?</option>
                <option value="1">Studentleker</option>
              </select>
            </div>
          </div>

          <!-- ***************** Navn ******************** -->
          <div class="inline fields">
            <label class="field four wide">Navn</label>
            <div class="field twelve wide">
              <input type="text" name="event_description" id="event_description" placeholder="Feks. Studentlekene Tromsø 2016">
            </div>
          </div>

          <!-- ***************** Superbruker ******************** -->
          <div class="inline fields">
            <label class="field four wide">Superbruker</label>
            <div class="field twelve wide">
              <input type="text" name="event_admin" id="event_admin" placeholder="Mailadresse til arrangørsuperbruker">
            </div>
          </div>

          <!-- ***************** Email ******************** -->
          <div class="inline fields">
            <label class="field four wide">Email</label>
            <div class="field twelve wide">
              <input type="text" name="event_email" id="event_email" placeholder="Mailadresse for arrangementet">
            </div>
          </div>

          <!-- ***************** Startdato ******************** -->
          <div class="inline fields">
            <label class="field four wide">Startdato</label>
            <div class="field three wide">
              <input type="text" name="event_start_day" id="event_start_day" placeholder="dd" maxlength="2">
            </div>
            
            <div class="field five wide">
              <select class="ui fluid dropdown" name="event_start_month" id="event_start_month">
                <option value="">mm</option>
                <option value="01">januar</option>
                <option value="02">februar</option>
                <option value="03">mars</option>
                <option value="04">april</option>
                <option value="05">mai</option>
                <option value="06">juni</option>
                <option value="07">juli</option>
                <option value="08">august</option>
                <option value="09">september</option>
                <option value="10">oktober</option>
                <option value="11">november</option>
                <option value="12">desember</option>
              </select>
            </div>

            <div class="field four wide">
              <input type="text" name="event_start_year" id="event_start_year" placeholder="yyyy" maxlength="4">
            </div>
          </div>

          <!-- ***************** Sluttdato ******************** -->
          <div class="inline fields">
            <label class="field four wide">Sluttdato</label>
            <div class="field three wide">
              <input type="text" name="event_end_day" id="event_end_day" placeholder="dd" maxlength="2">
            </div>
            
            <div class="field five wide">
              <select class="ui fluid dropdown" name="event_end_month" id="event_end_month">
                <option value="">mm</option>
                <option value="01">januar</option>
                <option value="02">februar</option>
                <option value="03">mars</option>
                <option value="04">april</option>
                <option value="05">mai</option>
                <option value="06">juni</option>
                <option value="07">juli</option>
                <option value="08">august</option>
                <option value="09">september</option>
                <option value="10">oktober</option>
                <option value="11">november</option>
                <option value="12">desember</option>
              </select>
            </div>

            <div class="field four wide">
              <input type="text" name="event_end_year" id="event_end_year" placeholder="yyyy" maxlength="4">
            </div>
          </div>

        </form>
      </div> <!-- /column -->
    </div> <!-- /grid -->
  </div> <!-- /container -->
  </div>
  <div class="actions">
    <div class="ui deny button">
      Avbryt
    </div>
    <div class="ui positive right labeled icon button" onclick="saveEvent()">
      Lagre
      <i class="checkmark icon"></i>
    </div>
  </div>
</div>


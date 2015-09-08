<?php require('header.php'); ?>

<div class="ui grid">
	<div class="column ten wide">

    <h1>Idretter</h1>

    <button class="ui icon button" onclick="showSportModal()">
      <i class="icon plus"></i>Legg til idrett
    </button>

    <button class="ui icon button" onclick="showRestrictionsModal()">
      <i class="icon plus"></i>Restriksjoner for påmelding
    </button>

	</div>
</div> <!-- /ui grid -->
<?php require('footer.php'); ?>


<!-- ***************** Idrett-modal ******************** -->
<div class="ui modal" id="sport_modal">
  <i class="close icon"></i>
  <div class="header">
    Legg til idrett
  </div>
  <div class="content">
  <div class="ui container">
    <div class="ui grid">
      <div class="eight wide column">
        <form class="ui form" id="sport_form">

          <!-- ***************** Idrett ******************** -->
          <div class="inline fields">
            <label class="field four wide">Idrett</label>
            <div class="field twelve wide">
              <select class="ui search dropdown" name="sport_description" id="sport_description">
                <option value="">Hvilken idrett?</option>
              </select>
            </div>
          </div>

          <!-- ***************** Type ******************** -->
          <div class="inline fields">
            <label class="field four wide">Type</label>
            <div class="field twelve wide">
              <select class="ui search dropdown" name="sport_type" id="sport_type">
                <option value="">SC eller SM?</option>
                <option value="1">Student-cup</option>
                <option value="2">Studentmesterskap</option>
              </select>
            </div>
          </div>

          <!-- ***************** Ansvarlig ******************** -->
          <div class="inline fields">
            <label class="field four wide">Ansvarlig</label>
            <div class="field twelve wide">
              <input type="text" name="sport_responsible" id="sport_responsible" placeholder="Hvem er ansvarlig for idretten?">
            </div>
          </div>

          <!-- ***************** Lokasjon ******************** -->
          <div class="inline fields">
            <label class="field four wide">Lokasjon</label>
            <div class="field twelve wide">
              <input type="text" name="sport_location" id="sport_location" placeholder="Hvor skal idretten foregå?">
            </div>
          </div>

          <!-- ***************** Påmeldingsfrist ******************** -->
          <div class="inline fields">
            <label class="field four wide">Påmeldingsfrist</label>
            <div class="field three wide">
              <input type="text" name="sport_deadline_day" id="sport_deadline_day" placeholder="dd" maxlength="2">
            </div>
            
            <div class="field five wide">
              <select class="ui fluid dropdown" name="sport_deadline_month" id="sport_deadline_month">
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
              <input type="text" name="sport_deadline_year" id="sport_deadline_year" placeholder="yyyy" maxlength="4">
            </div>
          </div>


          <!-- ***************** Max antall deltakere ******************** -->
          <div class="inline fields">
            <label class="field four wide">Kapasitet</label>
            <div class="field twelve wide">
              <input type="text" name="sport_capacity" id="sport_capacity" placeholder="Hvor mange kan delta på idretten?">
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
    <div class="ui positive right labeled icon button" onclick="saveSport()">
      Lagre
      <i class="checkmark icon"></i>
    </div>
  </div>
</div>

<!-- ***************** Restriksjoner-modal ******************** -->
<div class="ui modal" id="restrictions_modal">
  <i class="close icon"></i>
  <div class="header">
    Angi restriksjoner påmelding
  </div>
  <div class="content">
  <div class="ui container">
    <div class="ui grid">
      <div class="sixteen wide column">
        <form class="ui form" id="entry_form">

          <div class="inline fields">
            <label class="field four wide">Restriksjoner</label>
            <div class="grouped fields" id="restrictions">
              <div class="ui checkbox">
                <input type="checkbox" id="restriction_same_day">
                <label>Forby påmelding til idretter som går samme dag</label>
              </div>  
              <div class="ui checkbox">
                <input type="checkbox" id="restriction_multiple_teamexercises">
                <label>Forby påmelding til flere lagidretter</label>
              </div>             
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
    <div class="ui positive right labeled icon button" onclick="saveRestrictions()">
      Lagre
      <i class="checkmark icon"></i>
    </div>
  </div>
</div>
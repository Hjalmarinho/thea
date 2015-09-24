<?php require('header.php'); ?>

<div class="ui container">

  <div class="ui grid">
    <div class="column sixteen wide">

      <h1>Idretter</h1>

      <button class="ui icon button" onclick="showSportModal()">
        <i class="icon plus"></i>Legg til idrett
      </button>

      <button class="ui icon button" onclick="showRestrictionsModal()">
        <i class="icon plus"></i>Restriksjoner for påmelding
      </button>


      <!-- Participants table -->
      <table id="sports_table" class="ui sortable celled striped table" style="cursor: pointer">
        <thead>
          <tr>
            <th class="three wide ascending">Idrett</th>
            <th class="three wide ascending">Øvelse</th>
            <th class="three wide ascending">Lokasjon</th>
            <th class="three wide ascending">Lagidrett</th>
            <th class="two wide ascending">Kostnad</th>
            <th class="two ascending wide">ID</th>
          </tr>
        </thead>
        <tbody id="sports_table_body">        
          <!-- Sports are populated here when a call has been made to the API from api_handler.js -->
        </tbody>
      </table>
    </div>
  </div> <!-- /ui grid -->
</div>
<?php require('footer.php'); ?>


<!-- ***************** Idrett-modal ******************** -->
<div class="ui modal" id="sport_modal">
  <i class="close icon"></i>
  <div class="header">
    Idrett
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
                <input type="text" name="sport_description" id="sport_description" placeholder="Hvilken idrett?">
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
                <input type="text" name="exercise_responsible" id="exercise_responsible" placeholder="Hvem er ansvarlig for idretten?">
              </div>
            </div>

            <!-- ***************** Lokasjon ******************** -->
            <div class="inline fields">
              <label class="field four wide">Lokasjon</label>
              <div class="field twelve wide">
                <input type="text" name="exercise_location" id="exercise_location" placeholder="Hvor skal idretten foregå?">
              </div>
            </div>

            <!-- ***************** Kostnad ******************** -->
            <div class="inline fields">
              <label class="field four wide">Kostnad</label>
              <div class="field twelve wide">
                <input type="text" name="sport_fee" id="sport_fee" placeholder="Hva skal det koste å delta i idretten?">
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
              <label class="field four wide">Kapasitet herrer</label>
              <div class="field twelve wide">
                <input type="text" name="sport_capacity_male" id="sport_capacity_male" placeholder="Hvor mange herrer kan delta på idretten?">
              </div>
            </div>

            <div class="inline fields">
              <label class="field four wide">Kapasitet damer</label>
              <div class="field twelve wide">
                <input type="text" name="sport_capacity_female" id="sport_capacity_female" placeholder="Hvor mange damer kan delta på idretten?">
              </div>
            </div>

            <!-- ***************** Lagidrett ******************** -->
            <div class="inline fields">
              <label class="field four wide">Lagidrett</label>
              <div class="field twelve wide">
                <select class="ui search dropdown" name="is_teamexercise" id="is_teamexercise">
                  <option value="">Er det en lagidrett?</option>
                  <option value="1">Ja</option>
                  <option value="0">Nei</option>
                </select>
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
        <div class="ten wide column">
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
<!-- ******************************************************************
[Entry Participant]

Project:      Thea 
Version:      2.0
Last change:  11/08/2015
Author:       Øystein Molnes
Primary use:  View allowing participants to register for an event.
*********************************************************************** -->

<!DOCTYPE html>
<html>

<head>
  <!-- Insert view for the head -->
  <?php require("view_components/head.php"); ?>
</head>

<body>

  <div class="ui container">
    <div class="ui grid">
      <div class="six wide column">

        <form class="ui form" id="participant_form"  onsubmit="return false;">

          <!-- Insert view for entering personal information -->
          <?php require("view_components/personal_info.php"); ?>

          <!-- DELTAKERINFORMASJON -->
          <h4 class="ui dividing header">Deltakerinformasjon</h4>

          <div id="ticket_id" data-value="1"></div>

          <div class="inline fields">
            <label class="field four wide">Klubb</label>
            <div class="field twelve wide">
              <select class="ui search dropdown" name="clubs" id="clubs">
                <option value="">Hvilken klubb deltar du for?</option>
                <!-- Clubs are populated here from api_handler on page load -->
              </select>
            </div>
          </div>

          <div class="inline fields">
            <label class="field four wide">Medlem</label>
            <div class="field twelve wide">
              <select class="ui dropdown" name="is_clubmember" id="is_clubmember">
                <option value="">Er du medlem av klubben?</option>
                <option value="1">Ja</option>
                <option value="0">Nei</option>
              </select>
            </div>
          </div>

          <div class="inline fields">
            <label class="field four wide">Idrett</label>
            <div class="field twelve wide">
              <select class="ui search dropdown" name="sports" id="sports">
                <option value="">Hvilken idrett skal du delta i?</option>
                <!-- Sports are populated here from api_handler on page load -->
              </select>
            </div>
          </div>

          <div class="inline fields">
            <label class="field four wide"></label>
            <div class="field twelve wide">
              <div class="grouped fields" id="exercises">
                <!-- Exercise-checkboxes are populated here from api_handler when a sport is selected -->

              </div>
            </div>
          </div>

          <div class="inline fields" id="teams_container" style="display:none">
            <label class="field four wide">Lag</label>
            <div class="field twelve wide">
              <select class="ui search dropdown" name="teams" id="teams">
                <option value="">Hvilket lag skal du delta med?</option>
                <!-- Teams are populated here from api_handler when a team sport is selected -->
              </select>
            </div>
          </div>


          <div class="inline fields">
            <label class="field four wide"></label>
            <div class="ui button"> Delta i flere idretter</div>
          </div>

          <!-- Insert view for portrait image and additions-->
          <?php require("view_components/portrait_additions.php"); ?>

          <div class="inline fields">
            <label class="field four wide"></label>
            <button class="ui teal button" onclick="submitParticipantForm()">
              Meld på
            </button>
          </div>
          <div class="ui error message"></div>

        </form>
      </div> <!-- /column -->
    </div> <!-- /grid -->
  </div> <!-- /container -->
</body>
</html>
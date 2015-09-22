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
      <div class="six wide computer ten wide tablet fourteen wide mobile column">

        <form class="ui form" id="entry_form">
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

          <!-- This box can be copied in order to allow users to entry for several sports -->
          <div id="sports_container">
            <div id="sports_box_1" name="sports_box">
              <div class="inline fields">
                <label class="field four wide">Idrett</label>
                <div class="field twelve wide">
                  <select class="ui search dropdown" name="sports" id="sports_1">
                    <option value="">Hvilken idrett skal du delta i?</option>
                    <!-- Sports are populated here from api_handler on page load -->
                  </select>
                </div>
              </div>

              <div class="inline fields">
                <label class="field four wide"></label>
                <div class="field twelve wide">
                  <div class="grouped fields" name="exercises" id="exercises_1">
                    <!-- Exercise-checkboxes are populated here from api_handler when a sport is selected -->

                  </div>
                </div>
              </div>

              <div class="inline fields" name="teams_container" id="teams_container_1" style="display:none">
                <label class="field four wide">Lag</label>
                <div class="field twelve wide">
                  <select class="ui search dropdown" name="teams" id="teams_1">
                    <option value="">Hvilket lag skal du delta med?</option>
                    <!-- Teams are populated here from api_handler when a team sport is selected -->
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Insert view for portrait image and additions-->
          <?php require("view_components/portrait_additions.php"); ?>

          <div class="inline fields">
            <label class="field four wide"></label>
            <div class="ui blue submit button" id="entry_button">
              Meld på
            </div>
          </div>
          <div class="ui error message"></div>

        </form>
      </div> <!-- /column -->
    </div> <!-- /grid -->
  </div> <!-- /container -->

  <!-- Insert the confirm modal -->
  <?php require("view_components/confirm_modal.php"); ?>

  <!-- Insert error modal -->
  <?php require("view_components/error_modal.php"); ?>
</body>
</html>

<!DOCTYPE html>
<!-- ******************************************************************
[Entry Team]

Project:      Thea 
Version:      2.0
Last change:  11/08/2015
Author:       Øystein Molnes
Primary use:  View allowing contact persons to register teams for an event.
*********************************************************************** -->
<?php require_once(__DIR__ . '/site_info.php'); ?>

<?php
$event_id = filter_input(INPUT_GET, "event_id", FILTER_VALIDATE_INT);
?>

<html>

<head>
  <!-- Insert view for the head -->
  <?php require("view_components/head.php"); ?>
  <script type="text/javascript" src="<?php echo ROOT_URL ?>/js/main.js"></script>
  <script type="text/javascript" src="<?php echo ROOT_URL ?>/js/validation.js"></script>
</head>

<body>

  <div class="ui container">
    <div id="mainLoader" class="ui active inverted dimmer">
      <div class="ui large text loader">Gjør klar påmeldingssiden...</div>
    </div>
    <div class="ui grid">
      <div class="six wide computer ten wide tablet fourteen wide mobile column">
        <?php require("view_components/error_msg.php"); ?>
        <form class="ui form" id="entry_form">

          <!-- Insert view for entering personal information -->
          <?php require("view_components/personal_info.php"); ?>

          <!-- LAG- OG DELTAKERINFORMASJON -->
          <h4 class="ui dividing header">Lag- og deltakerinformasjon</h4>
          <div id="ticket_type" data-value="2"></div>

          <div class="inline fields">
            <label class="field four wide">Klubb</label>
            <div class="field twelve wide">
              <select class="ui search dropdown" name="club" id="clubs">
                <option value="">Hvilken klubb tilhører laget?</option>
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

          <div id="sports_container">
            <div id="sports_box_0" data-name="sports_box">
              <div class="inline fields" id="sports_div">
                <label class="field four wide">Idrett</label>
                <div class="field twelve wide">
                  <select class="ui search dropdown" name="sports" id="sports_0">
                    <option value="">Hvilken idrett skal laget delta i?</option>
                    <!-- Sports are populated here from api_handler on page load -->
                  </select>
                </div>
              </div>

              <div class="inline fields">
                <label class="field four wide"></label>
                <div class="field twelve wide">
                  <div class="grouped fields" id="exercises_0">
                    <!-- Exercise-checkboxes are populated here from api_handler when a sport is selected -->
                  </div>
                </div>
              </div>

              <div class="inline fields">
                <label class="field four wide">Lagnavn</label>
                <div class="field twelve wide">
                  <input type="text" name="team_name" id="team_name">
                </div>
              </div>

              <div class="inline fields" <?php if ($event_id == 47) { echo "style='display:none;'"; } ?>>
                <label class="field four wide">Klasse</label>
                <div class="field twelve wide">
                  <select class="ui dropdown" name="team_gender" id="team_gender">
                    <option value="">I hvilken klasse deltar laget?</option>
                    <option value="MALE">Herre</option>
                    <option value="FEMALE">Dame</option>
                    <option value="MIX" <?php if ($event_id == 47) { echo "selected"; } ?>>Mix</option>
                  </select>
                </div>
              </div>

              <div class="inline fields">
                <label class="field four wide">Spillende</label>
                <div class="field twelve wide">
                  <select class="ui dropdown" name="is_playing" id="is_playing">
                    <option value="">Skal du spille på laget?</option>
                    <option value="1">Ja</option>
                    <option value="0">Nei</option>
                  </select>
                </div>
              </div>
            </div>

            <div id="sports_box_1" data-name="sports_box" hidden>
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
                  <div class="grouped fields" data-name="exercises" id="exercises_1">
                    <!-- Exercise-checkboxes are populated here from api_handler when a sport is selected -->

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="add-sport-button" class="ui blue button" onclick="addSport();">Delta i flere idretter</div>
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

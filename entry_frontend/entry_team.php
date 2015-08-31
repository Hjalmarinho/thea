<!-- ******************************************************************
[Entry Team]

Project:      Thea 
Version:      2.0
Last change:  11/08/2015
Author:       Øystein Molnes
Primary use:  View allowing contact persons to register teams for an event.
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

        <form class="ui form" id="entry_form">

          <!-- Insert view for entering personal information -->
          <?php require("view_components/personal_info.php"); ?>

          <!-- LAG- OG DELTAKERINFORMASJON -->
          <h4 class="ui dividing header">Lag- og deltakerinformasjon</h4>
          <div id="ticket_id" data-value="2"></div>

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
              <select class="ui dropdown" name="is_clubmember">
                <option value="">Er du medlem av klubben?</option>
                <option value="1">Ja</option>
                <option value="0">Nei</option>
              </select>
            </div>
          </div>

          <div class="inline fields" id="sports_div">
            <label class="field four wide">Idrett</label>
            <div class="field twelve wide">
              <select class="ui search dropdown" name="sports" id="sports">
                <option value="">Hvilken idrett skal laget delta i?</option>
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

          <div class="inline fields">
            <label class="field four wide">Lagnavn</label>
            <div class="field twelve wide">
              <input type="text" name="team_name" id="team_name">
            </div>
          </div>

          <div class="inline fields">
            <label class="field four wide">Klasse</label>
            <div class="field twelve wide">
              <select class="ui dropdown" name="team_gender" id="team_gender">
                <option value="">I hvilken klasse spiller laget?</option>
                <option value="1">Herre</option>
                <option value="0">Dame</option>
                <option value="0">Mix</option>
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

</body>
</html>
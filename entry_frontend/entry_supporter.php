<!-- ******************************************************************
[Entry Team]

Project:      Thea 
Version:      2.0
Last change:  31/08/2015
Author:       Øystein Molnes
Primary use:  View allowing suppporters to register for an event.
*********************************************************************** -->

<!DOCTYPE html>
<html>

<head>
  <!-- Insert view for the head -->
  <?php require("view_components/head.php"); ?>
</head>

<body>

  <div class="ui container">
    <div id="mainLoader" class="ui active inverted dimmer">
      <div class="ui large text loader">Gjør klar påmeldingssiden...</div>
    </div>
    <div class="ui grid">
      <div class="six wide computer ten wide tablet fourteen wide mobile column">

        <form class="ui form" id="entry_form">

          <!-- Insert view for entering personal information -->
          <?php require("view_components/personal_info.php"); ?>

          <div id="ticket_id" data-value="3"></div>

          <!-- DELTAKERINFORMASJON -->
          <h4 class="ui dividing header">Deltakerinformasjon</h4>

          <div class="inline fields">
            <label class="field four wide">Klubb</label>
            <div class="field twelve wide">
              <select class="ui search dropdown" name="club" id="clubs">
                <option value="">Hvilken klubb er du supporter for?</option>
                <!-- Clubs are populated here from api_handler on page load -->
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
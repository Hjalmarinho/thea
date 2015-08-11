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

    <form class="ui form" id="participant_form" method="POST">

      <!-- Insert view for entering personal information -->
      <?php require("view_components/personal_info.php"); ?>

      <!-- DELTAKERINFORMASJON -->
      <h4 class="ui dividing header">Deltakerinformasjon</h4>

      <div class="inline fields">
        <label class="field two wide">Klubb</label>
        <div class="field four wide">
          <select class="ui search dropdown" name="clubs" id="clubs">
            <option value="">Hvilken klubb deltar du for?</option>
          </select>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Medlem</label>
        <div class="field four wide">
          <select class="ui dropdown" name="member">
            <option value="">Er du medlem av klubben?</option>
            <option value="1">Ja</option>
            <option value="0">Nei</option>
          </select>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Idrett</label>
        <div class="field four wide">
          <select class="ui search dropdown" name="sports" id="sports">
            <option value="">Hvilken idrett skal du delta i?</option>
          </select>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide"></label>
        <div class="field four wide">
          <div class="grouped fields" id="exercises">

            <!-- Exercises are displayed from api_handler when a sport is selected -->
          </div>
        </div>
      </div>

      <div class="inline fields" id="teams_container" style="display:none">
        <label class="field two wide">Lag</label>
        <div class="field four wide">
          <select class="ui search dropdown" name="teams" id="teams" >
            <option value="">Hvilket lag skal du spille for?</option>
            <option value="1">NTNUI</option>
          </select>
        </div>
      </div>


      <div class="inline fields">
        <label class="field two wide"></label>
        <div class="ui basic button"> Delta i flere idretter</div>
      </div>

      <!-- Insert view for portrait image and additions-->
      <?php require("view_components/portrait_additions.php"); ?>
      
      <div class="inline fields">
        <label class="field two wide"></label>
        <div class="ui teal button" onclick="submitParticipantForm()">
          Meld på
        </div>
      </div>
      <div class="ui error message"></div>

    </form>

  </div>
</body>
</html>
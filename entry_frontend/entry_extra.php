<!DOCTYPE html>
<!-- ******************************************************************
[Entry Participant]

Project:      Thea 
Version:      2.0
Last change:  11/08/2015
Author:       Øystein Molnes
Primary use:  View allowing participants to register for an event.
*********************************************************************** -->
<?php

define('SKIP_TRAVEL_INFORMATION', null);
define('SKIP_IS_STUDENT', null);
define('SKIP_ADDITIONS', null);
define('SKIP_TERMS', null);

require_once(__DIR__ . '/site_info.php');

?>
<html>

<head>
  <!-- Insert view for the head -->
  <?php require("view_components/head.php"); ?>

  <script type="text/javascript" src="<?php echo ROOT_URL ?>/js/main.js"></script>
  <script type="text/javascript" src="<?php echo ROOT_URL ?>/js/validation.js"></script>

  <script>
    var key = null;
    <?php
    $key = filter_input(INPUT_GET, 'key');
    if (!is_null($key))
      echo 'key = "' . $key . '";';
    ?>
  </script>
</head>

<div class="ui modal" id="confirm-extra-modal">
  <div class="header">
    Registrert
  </div>
  <div class="content">
    <p>Tusen takk, du er nå registrert!</p>
  </div>
  <div class="actions">
    <div class="ui close button green">Ok, supert!</div>
  </div>
</div>

<body>
  <div class="ui container">
    <div id="mainLoader" class="ui active inverted dimmer">
      <div class="ui large text loader">Gjør klar påmeldingssiden...</div>
    </div>
    <div class="ui grid">
      <div class="six wide computer ten wide tablet fourteen wide mobile column">
        <?php require("view_components/error_msg.php"); ?>
        <form class="ui form" id="entry_form">
          <div id="ticket_id" data-value="4"></div>

          <!-- Insert view for entering personal information -->
          <?php require("view_components/personal_info.php"); ?>

          <div class="inline fields">
            <label class="field four wide">Organisasjon</label>
            <div class="field twelve wide">
              <input type="text" name="organization" id="organization">
            </div>
          </div>

          <div class="inline fields">
            <label class="field four wide">Tittel/funksjon</label>
            <div class="field twelve wide">
              <input type="text" name="role" id="role">
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

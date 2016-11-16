<!-- ******************************************************************
[Index start-page]

Project:    Thea 
Version:    2.0
Last change:  31/08/2015
Author:      Øystein Molnes
Primary use:  This page is displayed when an entry has been completed
*********************************************************************** -->
<?php require_once(__DIR__ . '/site_info.php'); ?>

<!DOCTYPE html>
<html>
<head>
  <!-- Insert view for the head -->
  <?php require("view_components/head.php"); ?>

  <script type="text/javascript" src="<?php echo ROOT_URL ?>/js/main.js"></script>
  <script type="text/javascript" src="<?php echo ROOT_URL ?>/js/validation.js"></script>

  <script>
  var RESPONSE_CODE = "responseCode";
  var TRANSACTION_ID = "transactionId";
  var ORDER_NUMBER = "orderNumber";
  var EVENT_ID = "eventId";

  function error(orderNumber, errorMsg)
  {
    if (orderNumber != null)
      terminateEntry(orderNumber);

    $("#wait").hide();

    $("#errorMsg").text(errorMsg);
    $("#error").show();
  }

  function success()
  {
    $("#wait").hide();
    $("#success").show();
  }

  $( document ).ready(function()
  {
    var responseCode = GetURLParameter(RESPONSE_CODE);
    var transactionId = GetURLParameter(TRANSACTION_ID);
    var orderNumber = GetURLParameter(ORDER_NUMBER);
    var eventId = GetURLParameter(EVENT_ID);

    if (orderNumber == null)
    {
      error(orderNumber, "Mangler GET-parameter '" + ORDER_NUMBER + "'.");
    }
    else if (responseCode != null && responseCode != "OK")
    {
      error(orderNumber, "Betalingen ble avbrutt av kjøperen.");
    }
    else if (eventId == null)
    {
      error(orderNumber, "Mangler GET-parameter '" + EVENT_ID + "'.");
    }
    else
    {
      completeEntry(orderNumber, eventId, function(data)
      {
        if (error !== null)
        {
          success();
        }
        else
        {
          error(orderNumber, "En uventet feil oppsto. Hvis problemet vedvarer, ber vi deg ta kontakt med arrangøren.");
        }
      },
      function(errorMsg)
      {
        error(orderNumber, errorMsg);
      });
    }
  });
  </script>
</head>

<body>

  <div class="ui container center">
    <div id="wait">
      <h1 class="ui center aligned icon blue header">
        <i class="circular wait icon"></i>
        Fullfører påmeldingen...
      </h1>

      <p>Bestillingen din fullføres i dette øyeblikk. Ikke naviger bort i fra denne siden før du har fått bekreftelse.</p>
    </div>
    <div id="success" hidden>
      <h1 class="ui center aligned icon blue header">
        <i class="circular checkmark icon"></i>
        Takk for at du meldte deg på!
      </h1>

      <p>Din bestilling er nå fullført, og du vil om kort tid motta en bekreftelsesmail med kvittering på eposten du oppga under påmeldingen/registrering. 
      Skulle du ha noen andre spørsmål, ber vi deg ta kontakt med arrangøren.</p>
    </div>
    <div id="error" hidden>
      <h1 class="ui center aligned icon red header">
        <i class="circular remove icon"></i>
        Upsi, noe gikk galt!
      </h1>

      <p>Bestillingen din ble ikke fullført, grunnet problemer med betalingen din. Frykt ikke; ingen penger har blitt trukket fra din bankkonto.
      Skulle problemet vedvare, ber vi deg ta kontakt med arrangøren av idrettsarrangementet. Et forsøk på mer detaljert beskrivelse av feilen finner du under.</p>
      <br>
      <p id="errorMsg"></p>
    </div>
  </div>
</body>
</html>
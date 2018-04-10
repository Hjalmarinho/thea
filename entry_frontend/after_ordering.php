<!DOCTYPE html>
<!-- ******************************************************************
[Entry Participant]

Project:      Thea
Version:      2.0
Last change:  12/05/2016
Author:       Erik Frøseth
Primary use:  Allow participants to buy additions after they have
              registered
*********************************************************************** -->
<?php require_once(__DIR__ . '/site_info.php'); ?>
<html>

<head>
  <!-- Insert view for the head -->
  <?php require("view_components/head.php"); ?>
  <script type="text/javascript" src="<?php echo ROOT_URL ?>/js/validation.js"></script>

  <script>
  'use strict';

  $( document ).ready(function()
  {
    // API-calls on page load, parameter is the callback-function
    var req = apiGetAdditions(displayAdditions, showError, eventId);
    $.when(req).always(function()
    {
      $('#mainLoader').removeClass('active');
    });
  });

  function showError(error_msg)
  {
    $('#error_message').text(error_msg);
    $('#error_modal').modal('show');
  }


  function displayAdditions(additions)
  {
    if (additions.length == 0)
      showError('Det finnes ingen tillegg å kjøpe for dette arrangementet');

    // Sort additions by name
    sortArrayByString(additions, 'addition_description');

    $.each(additions, function(i, addition)
    {
      // Skip additions with parent.
      if (addition.parent_addition_id != null)
        return true;

      if (addition.has_children)
      {
        // Array.slice() ensures that we pass a copy of the array,
        // and not a reference.
        displayAdditionWithChildren(addition, additions.slice());
      }
      else
      {
        var addition_label = addition.addition_description + ' (' + addition.addition_fee + ' ,-)';
        $('#additions').append(generateCheckbox(addition_label, addition.addition_id, false, ''));
      }
    });

    // "Activate" any radiobuttons.
    $('.ui.radio.checkbox').checkbox();
  }


  function displayAdditionWithChildren(parentAddition, additions)
  {
    var first = true;
    $('#additions').append('<h2 class="ui sub header">' + parentAddition.addition_description + '</h2>');

    sortArrayByNumber(additions, 'addition_id');
    $.each(additions, function(i, children)
    {
      if (children.parent_addition_id == parentAddition.addition_id)
      {
        // Print the addition.
        $('#additions').append(
          '<div class="field"> \
              <div class="ui radio checkbox"> \
                  <input type="radio" id="' + parentAddition.addition_description + ', ' + children.addition_description + '" value="' + children.addition_id + '" name="fruit" tabindex="0" ' + (first ? ' checked ' : '') + ' class="hidden"> \
                  <label>' + children.addition_description + ' ' + ' (' + children.addition_fee + ' ,-)' + '</label> \
              </div> \
           </div>'
          );

        first = false;
      }
    });

    $('#additions').append('<br>');

    // VERY bad hack
    if (eventId == 11)
    {
      $('#additions').append('<a href="#" onclick="showTShirtImage();">Bilde av t-skjorte</a>');
      $('#additions').append('<br>');
    }
  }

  function showTShirtImage()
  {
    $('#image_modal').modal('show');
  }

  function generateCheckbox(label, value, checked, onchange)
  {
    var checkedStr = '';
    if (checked === true)
        checkedStr = ' checked ';

    return '<div class="field"> \
      <div class="ui checkbox"> \
        <input type="checkbox" value="' + value + '" id="addition_id_' + value + '" onchange="' + onchange + '" ' + checkedStr + '> \
        <label for="addition_id_' + value + '">' + label + '</label> \
      </div> \
    </div>';
  }


  function buyAdditions()
  {
    /*
      The JSON object should look something like the following:

      {
        "entry": {
          "entry_id": 5,
          "person": {
            "phone": "815 493 00"
          },
          "additions": [{
            "addition_id": 1,
            "num_items": 1
          }]
        }
      }
    */
    $('#buy_button').addClass('loading');

    var additions = [];
    $('#additions input:checked').each(function()
    {
      var addition_id = parseInt($(this).attr('value'));
      var num_items = parseInt('1');
      additions.push({'addition_id': addition_id, 'num_items': num_items});
    });

    var jsonObject = {};
    var entry = {};
    var person = {};
    entry['entry_id'] = parseInt($('#entry_id').val());
    entry['additions'] = additions;
    person['phone'] = $('#phone').val();

    entry['person'] = person;
    jsonObject['entry'] = entry;
    jsonObject['redirect_url'] = redirectURL;

    var request = apiPostParticipantAdditions(redirectToPayment, showError, jsonObject, eventId);
    $.when(request).always(function()
    {
      $('#buy_button').removeClass('loading');
    });
  }


  function redirectToPayment(data)
  {
    window.location.replace(data.payment_url);
  }
  </script>
</head>

<body>
  <div class="ui container">
    <div id="mainLoader" class="ui active inverted dimmer">
      <div class="ui large text loader">Gjør klar bestillingssiden...</div>
    </div>
    <div class="ui grid">
      <div class="six wide computer ten wide tablet fourteen wide mobile column">
        <?php require("view_components/error_msg.php"); ?>
        <form class="ui form" id="entry_form">
          <p><i>
          For å etterbestille tillegg, må du her fylle inn ditt deltakernummer og det telefonnummeret du meldte deg på med. Deltakernummeret finner du på påmeldingenskvitteringen din (se etter "Påmeldingsnr"). Hvis du ikke har påmeldingskvitteringen, ber vi deg ta kontakt med arrangøren.
          </i></p>
          <!-- DELTAKERINFORMASJON -->
          <h4 class="ui dividing header">Deltakerinformasjon</h4>
          
          <div class="inline fields">
            <label class="field four wide">Deltakernummer</label>
            <div class="field twelve wide">
              <input type="text" name="entry_id" id="entry_id">
            </div>
          </div>

          <div class="inline fields">
            <label class="field four wide">Telefonnummer</label>
            <div class="field twelve wide">
              <input type="text" name="phone" id="phone">
            </div>
          </div>

          <h4 class="ui dividing header">Tillegg</h4>
          <div class="inline fields" id="additions-container">
            <label class="field four wide">Tillegg</label>
            <div class="grouped fields" id="additions">
              <!-- Additions-checkboxes are populated here from api_handler on page load -->
            </div>
          </div>

          <div class="inline fields">
            <label class="field four wide"></label>
            <div class="ui blue button" id="buy_button" onclick="buyAdditions();">
              Kjøp tillegg
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

  <div class="ui modal" id="image_modal">
    <div class="header">
      Bilde av t-skjorte 
    </div>
    <div class="content">
      <img class="ui big image" src="https://pamelding.theachnology.com/img/tshirt.png" alt="T-skjorte">
    </div>
    <div class="actions">
      <div class="ui button close">Ok</div>
    </div>
  </div>
</body>
</html>

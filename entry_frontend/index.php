<!DOCTYPE html>
<!-- ******************************************************************
[Index start-page]

Project:      Thea
Version:      2.0
Last change:  20/12/2015
Author:       Øystein Molnes
Primary use:  Start page for the entry sites. Allows users to 
              select ticket type.
*********************************************************************** -->
<?php require_once(__DIR__ . '/site_info.php');


$alias = filter_input(INPUT_GET, 'alias');
$event_id = filter_input(INPUT_GET, 'event_id', FILTER_VALIDATE_INT);

if (!is_null($alias) && file_exists(__DIR__ . '/custom_sites/' . $alias . '.php'))
{
  require_once(__DIR__ . '/custom_sites/' . $alias . '.php');
}
else
{
?>

<html>
<head>
  <script>
  var input_event_id = null;
  var input_alias = null;
  <?php


  if (!is_null($event_id) && $event_id !== false)
    echo 'input_event_id = ' . $event_id . ';';
  else if (!is_null($alias))
    echo 'input_alias = "' . $alias . '";';
  ?>
  </script>
  <!-- Insert view for the head -->
  <?php require("view_components/head.php"); ?>
  <script type="text/javascript" src="<?php echo ROOT_URL ?>/js/validation.js"></script>
</head>

<body>
  <div class="ui container">
    <div class="ui center aligned grid">
      <div class="ui fourteen wide column">
        <div class="ui huge header" id="header">
        </div>
      </div>
      <div class="ui list">
        <div class="item">
          <i class="users icon"></i>
          <div class="content" id="organizer_name">
          </div>
        </div>
        <div class="item">
          <i class="calendar icon"></i>
          <div class="content" id="event_date">
          </div>
        </div>
      </div>
      <div class="ui row" id="tickets">
      </div>
      <div class="ui row">
        <div class="ui info floating message" id="info-box" hidden>
          <div class="header">
            Informasjon
          </div>
          <div id="info-text" style="text-align:left;"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
  </div>
</body>
<script>
  function getEventCallback(event_obj)
  {
    var event_start = new Date(event_obj.event_start);
    var event_end = new Date(event_obj.event_end);

    $('#header').text('Påmelding ' + event_obj.event_description);
    $('#organizer_name').text('Arrangør: ' + event_obj.event_organizer.club_name);
    if (event_obj.frontpage_info_text !== null)
    {
      $('#info-box').show();
      $('#info-text').html(event_obj.frontpage_info_text);
    }

    if (event_start == event_end)
    {
      $('#event_date').text(event_start.customFormat('#DD# #MMM# #YYYY#'));
    }
    else
    {
      $('#event_date').text(event_start.customFormat('#DD#.') + ' - ' + event_end.customFormat('#DD#. #MMMM# #YYYY#'));
    }
    $('#organizer_name').text();
    for (var i = 0; i < event_obj.tickets.length; ++i)
    {
      var ticket_obj = event_obj.tickets[i];

      if (ticket_obj.ticket_type == 'PARTICIPANT')
      {
        var ticket_text = "Meld på deltager";
        if (ticket_obj.display_text != null)
          ticket_text = ticket_obj.display_text;
        $('#tickets').append('<a href="' + event_obj.event_id + '/deltager?ticket_id=' + ticket_obj.ticket_id + '"><button class="ui blue button">' + ticket_text + '</button></a>');

        // VERY bad hack...ev
        if (event_obj.has_teamexercise)
          $('#tickets').append('<a href="' + event_obj.event_id + '/lagleder?ticket_id=' + ticket_obj.ticket_id + '"><button class="ui blue button">Meld på lag</button></a>');
      }
      else if (ticket_obj.ticket_type == 'SPECTATOR')
      {
        var ticket_text = "Meld på deltager";
        if (ticket_obj.display_text != null)
          ticket_text = ticket_obj.display_text;
        $('#tickets').append('<a href="' + event_obj.event_id + '/tilskuer?ticket_id=' + ticket_obj.ticket_id + '"><button class="ui blue button">' + ticket_text + '</button></a>');
      }
    }

    $('#tickets').append('<a href="' + event_obj.event_id + '/tillegg"><button class="ui blue button">Etterbestilling av tillegg</button></a>');
  }

  function errorHandler(errorMsg)
  {
    $('#header').text('Oops, noe uventet skjedde: ' + errorMsg);
  }

  if (input_event_id === null && input_alias === null)
  {
    $('#header').text('Ingen arrangement spesifisert...');
  }

  if (input_event_id !== null)
  {
    apiGetEvent(getEventCallback, errorHandler, input_event_id);
  }
  else if (input_alias !== null)
  {
    apiGetEventFromAlias(getEventCallback, errorHandler, input_alias);
  }
</script>
</html>
<?php
}

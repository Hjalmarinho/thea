'use strict';

var eventId = sessionStorage.getItem('event_id');
var last_entry_time = null;

$(document).ready(function()
{
  var summaryRequest = apiGetEventSummary(getStatistics, handleError, eventId)
  var eventRequest = apiGetEvent(getEvent, handleError, eventId)

  $.when(summaryRequest, eventRequest).always(function() {
    removeLoader();
  });
});

function getStatistics(data)
{
  var total_individuals = data.num_male_individuals + data.num_female_individuals;
  var total_teams = data.num_male_teams + data.num_female_teams + data.num_mix_teams;

  $('#numEntries').html('<i class="user icon"></i>' + total_individuals);
  $('#numFemale').html('<i class="woman icon"></i>' + data.num_female_individuals);
  $('#numMale').html('<i class="man icon"></i>' + data.num_male_individuals);
  $('#numTeams').html('<i class="users icon"></i>' + total_teams);

  last_entry_time = parseDateString(data.last_entry);
  lastEntryTimer();

  for (var i = 0; i < data.exercise_summaries.length; ++i)
  {
    var stats = data.exercise_summaries[i];

    var total_individuals = stats.total_male_individuals + stats.total_female_individuals;
    var total_teams = 0;
    if (stats.is_teamexercise)
      total_teams = stats.total_male_teams + stats.total_female_teams + stats.total_mix_teams;

    var str = '<tr>';

    str = str + '<td>';
    str = str + stats.exercise_description;
    str = str + '</td>';

    str = str + '<td>';
    str = str + stats.sport_description;
    str = str + '</td>';

    str = str + '<td>';
    if (stats.is_teamexercise)
    {
      str = str + stats.total_male_individuals + ' (' + stats.total_male_teams + ' lag)';
    }
    else
    {
      str = str + stats.total_male_individuals;
    }
    str = str + '</td>';

    str = str + '<td>';
    if (stats.is_teamexercise)
    {
      str = str + stats.total_female_individuals + ' (' + stats.total_female_teams + ' lag)';
    }
    else
    {
      str = str + stats.total_female_individuals;
    }
    str = str + '</td>';

    str = str + '<td>';
    str = str + (stats.is_teamexercise ? '-' : stats.total_mix_teams);
    str = str + '</td>';

    str = str + '<td>';
    if (stats.is_teamexercise)
    {
      str = str + total_individuals + ' (' + total_teams + ' lag)';
    }
    else
    {
      str = str + total_individuals;
    }
    str = str + '</td>';

    str = str + '</tr>';


    $('#exercisesBody').append(str);
  }
}

function getEvent(data)
{
  if (data)
  {
    var url = frontend_url + '/entry_extra.php?event_id=' + eventId + '&key=' + data.event_uuid;
    $('#external-entry').html('Adresse til påmelding for eksterne aktører: <a href="' + url + '">' + url + '</a>');
  }
}


function lastEntryTimer()
{
  if (last_entry_time == null)
  {
    $('#last_entry').html('');
  }
  else
  {
    var now = new Date();
    //now = now - time_offset;
    var diff_seconds = Math.round((now - last_entry_time) / 1000.0);

    var days = Math.floor(diff_seconds / 86400);
    diff_seconds = diff_seconds - (days * 86400);

    var hours = Math.floor(diff_seconds / 3600);
    diff_seconds = diff_seconds - (hours * 3600);

    var minutes = Math.floor(diff_seconds / 60);
    diff_seconds = diff_seconds - (minutes * 60);

    var seconds = diff_seconds;
    
    var str = days + ' ';

    if (days == 1)
    {
      str = str + 'dag';
    }
    else
    {
      str = str + 'dager';
    }
    str = str + ', ' + hours + ' ';

    if (hours == 1)
    {
      str = str + 'time';
    }
    else
    {
      str = str + 'timer';
    }
    str = str + ', ' + minutes + ' ';

    if (minutes == 1)
    {
      str = str + 'minutt';
    }
    else
    {
      str = str + 'minutter';
    }
    str = str + ' og ' + seconds + ' ';

    if (seconds == 1)
    {
      str = str + 'sekund';
    }
    else
    {
      str = str + 'sekunder';
    }

    $('#last_entry').text('Tid siden siste påmelding: ' + str + ' siden.');
  }

  setTimeout('lastEntryTimer()', 1000);
}


function handleError(errorMsg)
{
}


function removeLoader()
{
  $('#loader').hide();
}

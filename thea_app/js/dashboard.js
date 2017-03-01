'use strict';

var eventId = sessionStorage.getItem('event_id');
var last_entry_time = null;
var table = null;
$(document).ready(function()
{
  table = $('table').DataTable({
    'pagingType': 'numbers',
    'info': false,
    'paging': false,
    'language':
    {
      'search': 'Søk',
      'zeroRecords': 'Ingen treff'
    },
    'columns':
    [
      { 'data': 'exercise_description', 'render': exercise_column_render },
      { 'data': 'sport_description' },
      { 'data': null, 'render': male_column_render },
      { 'data': null, 'render': female_column_render },
      { 'data': null, 'render': mix_column_render },
      { 'data': null, 'render': total_column_render }
    ],
    'order': [[1, 'asc'], [0, 'asc']]
  });

  var summaryRequest = apiGetEventSummary(getStatistics, handleError, eventId)
  var eventRequest = apiGetEvent(getEvent, handleError, eventId)

  $.when(summaryRequest, eventRequest).always(function() {
    removeLoader();
    lastEntryTimer();
    setTimeout(getSummaryTimer, 5000);
  });
});

function exercise_column_render( data, type, full, meta )
{
  if (type === 'display')
    return '<a href="./exercise.php?exercise_id=' + full.exercise_id + '">' + full.exercise_description + '</a>';

  return data;
}



function male_column_render( data, type, full, meta )
{
  if (data.is_teamexercise)
    return data.total_male_individuals + ' (' + data.total_male_teams + ' lag)';
  else
    return data.total_male_individuals;
}


function female_column_render( data, type, full, meta )
{
  if (data.is_teamexercise)
    return data.total_female_individuals + ' (' + data.total_female_teams + ' lag)';
  else
    return data.total_female_individuals;
}

function mix_column_render( data, type, full, meta )
{
  return (data.is_teamexercise ? data.total_mix_teams + ' lag' : '-');

}

function total_column_render( data, type, full, meta )
{
  var total_individuals = data.total_male_individuals + data.total_female_individuals;
  var total_teams = data.total_male_teams + data.total_female_teams + data.total_mix_teams;

  if (data.is_teamexercise)
    return total_individuals + ' (' + total_teams + ' lag)';
  else
    return total_individuals;
}


function getSummaryTimer()
{
  apiGetEventSummary(getStatistics, handleError, eventId);
  setTimeout(getSummaryTimer, 5000);
}


function getStatistics(data)
{
  var total_individuals = data.num_male_individuals + data.num_female_individuals;
  var total_teams = data.num_male_teams + data.num_female_teams + data.num_mix_teams;

  $('#numEntries').html('<i class="user icon"></i>' + total_individuals);
  $('#numFemale').html('<i class="woman icon"></i>' + data.num_female_individuals);
  $('#numMale').html('<i class="man icon"></i>' + data.num_male_individuals);
  $('#numTeams').html('<i class="users icon"></i>' + total_teams);

  if (data.last_entry != null)
    last_entry_time = parseDateString(data.last_entry);
  else
    last_entry_time = null;

  table.rows().remove();
  table.rows.add(data.exercise_summaries).draw();
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
    $('#last_entry').html('Ingen påmeldinger enda');
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

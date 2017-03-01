'use strict';

var event_id = sessionStorage.getItem('event_id');

$(document).ready(function() {
  var request = apiGetAllTeamsSimplified(displayTeams, handleError, event_id);
  $.when(request).always(function() { removeLoader(); });
})

function gender_column_render( data, type, full, meta )
{
  return customGenderFormat(data);
}


function time_registered_column_render( data, type, full, meta )
{
  var date = parseDateString(data);
  if (type === 'sort')
    return date.getTime();
  else
    return date.customFormat('#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#');
}

function displayTeams(teams)
{
  $('table').DataTable({
    'pagingType': 'numbers',
    'info': false,
    'language':
    {
      'search': 'Søk',
      'zeroRecords': 'Ingen treff',
      'lengthMenu': 'Vis _MENU_ lag'
    },
    'columns':
    [
      {
        'data': 'team_name',
        'createdCell': function (td, cellData, rowData, row, col)
        {
          $(td).attr('onclick', 'window.location.href="./team.php?team_id=' + rowData.team_id + '";');
          $(td).css('cursor', 'pointer');
          $(td).css('color', '#5b9aff');
        }
      },
      { 'data': 'sport_description' },
      {
        'data': 'exercise_description',
        'createdCell': function (td, cellData, rowData, row, col)
        {
          $(td).attr('onclick', 'window.location.href="./exercise.php?exercise_id=' + rowData.exercise_id + '";');
          $(td).css('cursor', 'pointer');
          $(td).css('color', '#5b9aff');
        }
      },
      { 'data': 'club_name' },
      { 'data': 'team_gender', 'render': gender_column_render },
      { 'data': 'time_registrated', 'render': time_registered_column_render },
      { 'data': 'team_id', 'visible': false },
    ],
    'order': [[6, 'desc']],
    'createdRow': function ( row, data, index )
    {
      switch (data.status)
      {
        case REGISTRATION_CANCELLED:
          $(row).addClass('error');
          break;
      }
    }
  }).rows.add(teams).draw();

return;
  sortArrayByNumberDesc(teams, 'team_id');

  for (var i = 0; i < teams.length; ++i)
  {
    var team = teams[i];
    var cssClass = '';
    if (team.status == REGISTRATION_CANCELLED)
      cssClass = 'error';

    var tablerow = '<tr class="' + cssClass + '">';

    var time_registrated = parseDateString(team.time_registrated);
    var time_registrated_str = time_registrated.customFormat('#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#');

    tablerow = tablerow + '<td onclick="window.location.href =\'./team.php?team_id=' + team.team_id + '\';" style="cursor:pointer;">';
    tablerow = tablerow + team.team_name;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + team.sport_description;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + '<a href="./exercise.php?exercise_id=' + team.exercise_id +'">' + team.exercise_description + '</a>';
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + team.club_name;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + customGenderFormat(team.team_gender);
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td data-sort-value="' + time_registrated.getTime() + '">';
    tablerow = tablerow + time_registrated_str;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '</tr>';

    $('#teams').append(tablerow)
  }
}

function handleError(errorMsg) {
}

function removeLoader() {
  $("#teamsLoader").remove();
}

function addNewTeam() {
  var request = apiPostNewTeam(function(data) {location.href = './team.php?first=true&team_id=' + data.team_id;}, handleError, "", event_id);
}

'use strict';

var event_id = sessionStorage.getItem('event_id');
var exercise_id = GetURLParameter('exercise_id');
var table = null;
var exercise_obj = null;
var clubs = {};

$(document).ready(function()
{
  var request = apiGetClubs(function(data) {
    for (var i = 0; i < data.length; ++i)
    {
      clubs[data[i].club_id] = data[i];
    }
  }, handleError);

  $.when(request).always(function() {
    apiGetExercise(displayExercise, handleError, event_id, exercise_id);
  });
});

function max_male_changed(sender)
{
  var num = parseInt($(sender).val());
  if (exercise_obj.is_teamexercise && !isNaN(num))
    $('#calculated-male-teams').text(num / exercise_obj.slots_per_team + ' lag');
  else
    $('#calculated-male-teams').text('');
}

function max_female_changed(sender)
{
  var num = parseInt($(sender).val());
  if (exercise_obj.is_teamexercise && !isNaN(num))
    $('#calculated-female-teams').text(num / exercise_obj.slots_per_team + ' lag');
  else
    $('#calculated-female-teams').text('');
}

function max_total_changed(sender)
{
  var num = parseInt($(sender).val());
  if (exercise_obj.is_teamexercise && !isNaN(num))
    $('#calculated-total-teams').text(num / exercise_obj.slots_per_team + ' lag');
  else
    $('#calculated-total-teams').text('');
}

function displayExercise(exercise)
{
  exercise_obj = exercise;
  $('#exercise-description').val(exercise.exercise_description);

  $('#max-male').val(exercise.max_male);
  $('#max-female').val(exercise.max_female);
  $('#max-total').val(exercise.num_slots);

  var request = null;
  if (exercise.is_teamexercise)
  {
    
    $('#team-info').show();
    $('#entry-teams').show();
    $('#slots-per-team').val(exercise.slots_per_team);
    $('#max-non-students-per-team').val(exercise.max_non_students_per_team);
    $('#allow-mix-teams').prop('checked', exercise.allow_mix_teams);

    max_male_changed($('#max-male'));
    max_female_changed($('#max-female'));
    max_total_changed($('#max-total'));

    request = apiGetTeamsForExercise(displayTeams, handleError, event_id, exercise_obj.exercise_id);
  }
  else
  {
    $('#team-info').hide();
    $('#entry-individuals').show();

    request = apiGetParticipantsForExercise(displayParticipants, handleError, event_id, exercise_obj.exercise_id);
  }

  $.when(request).always(function() { $('#exercise-loader').hide(); });

}


function gender_column_render( data, type, full, meta )
{
  return customGenderFormat(data);
}


function club_name_column_render( data, type, full, meta )
{
  return clubs[data].club_name;
}


function displayTeams(teams)
{
  table = $('#table-teams').DataTable({
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
      { 'data': 'club_id', 'render': club_name_column_render },
      { 'data': 'team_gender', 'render': gender_column_render }
    ],
    'order': [[0, 'asc']]
  }).rows.add(teams).draw();

  var num_male = table.rows(function(idx, team, node)
                 {
                   return team.team_gender == 'Male';
                 }).count();

  var num_female = table.rows(function(idx, team, node)
                   {
                     return team.team_gender == 'Female';
                   }).count();

  var num_mix = table.rows(function(idx, team, node)
                {
                  return team.team_gender == 'Mix';
                }).count();

  $('#exercise-info').append('Damelag: ' + num_female);
  $('#exercise-info').append('<br>Herrelag: ' + num_male);
  $('#exercise-info').append('<br>Mixlag: ' + num_mix);
  $('#exercise-info').append('<br>Totalt: ' + (num_female + num_male + num_mix));
}


function displayParticipants(participants)
{
  table = $('#table-participants').DataTable({
    'pagingType': 'numbers',
    'info': false,
    'language':
    {
      'search': 'Søk',
      'zeroRecords': 'Ingen treff',
      'lengthMenu': 'Vis _MENU_ deltakere'
    },
    'columns':
    [
      {
        'data': 'first_name',
        'createdCell': function (td, cellData, rowData, row, col)
        {
          $(td).attr('onclick', 'window.location.href="./participant.php?entry_id=' + rowData.entry_id + '";');
          $(td).css('cursor', 'pointer');
          $(td).css('color', '#5b9aff');
        }
      },
      { 'data': 'last_name' },
      { 'data': 'club_name' },
      { 'data': 'gender', 'render': gender_column_render },
      { 'data': 'status', 'visible': false }
    ],
    'order': [[1, 'asc'], [0, 'asc']]
  }).rows.add(participants).column(4).search(REGISTRATION_CONFIRMED).draw();
  var num_male = table.rows(function(idx, entry, node)
                 {
                   return entry.gender == 'Male' &&
                          entry.status == REGISTRATION_CONFIRMED;
                 }).count();

  var num_female = table.rows(function(idx, entry, node)
                   {
                     return entry.gender == 'Female' &&
                            entry.status == REGISTRATION_CONFIRMED;
                   }).count();

  $('#exercise-info').append('Damer: ' + num_female);
  $('#exercise-info').append('<br>Herrer: ' + num_male);
  $('#exercise-info').append('<br>Totalt: ' + (num_male + num_female));
}


function handleError(errorMsg)
{
}
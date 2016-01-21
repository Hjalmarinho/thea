'use strict';

var event_id = sessionStorage.getItem('event_id');
var exercise_id = GetURLParameter('exercise_id');

$(document).ready(function()
{
  apiGetExercise(displayExercise, handleError, event_id, exercise_id);
});

function displayExercise(exercise)
{
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

    request = apiGetAllTeams(displayTeams, handleError, event_id);
  }
  else
  {
    $('#team-info').hide();
    $('#entry-individuals').show();

    request = apiGetParticipants(displayParticipants, handleError, event_id, false, true, false, false, false);
  }

  $.when(request).always(function() { $('#exercise-loader').hide(); });

}


function displayTeams(teams)
{
  sortArrayByString(teams, 'team_name');
  sortArrayByString(teams, 'team_gender');

  var female_teams = 0;
  var male_teams = 0;
  var mix_teams = 0;
  $.each(teams, function (i, team)
  {
    if (team.exercise_id == exercise_id && team.status == REGISTRATION_CONFIRMED)
    {
      if (team.team_gender == 'Female')
        female_teams++;
      else if (team.team_gender == 'Male')
        male_teams++;
      else if (team.team_gender == 'Mix')
        mix_teams++;

      var team_name = team.team_name;
      var club_name = team.contact_person.club.club_name;
      var team_gender = customGenderFormat(team.team_gender);
      var entry_id = team.contact_person.entry_id;
      var contact_person_first_name = team.contact_person.person.first_name;
      var contact_person_last_name = team.contact_person.person.last_name;
      var club_id = team.contact_person.club.club_id;
      var tablerow = 
      '<tr> \
      <td><a href="team.php?team_id=' + team.team_id +'">' + team_name + '</a></td> \
      <td>' + club_name + '</td> \
      <td>' + team_gender + '</td> \
      <td><a href="participant.php?entry_id=' + entry_id +'">' + contact_person_first_name + " " + contact_person_last_name + '</a></td> \
      </tr>';

      $('#teams').append(tablerow);
    }
  });

  $('#exercise-info').append('Damelag: ' + female_teams);
  $('#exercise-info').append('<br>Herrelag: ' + male_teams);
  $('#exercise-info').append('<br>Mixlag: ' + mix_teams);
  $('#exercise-info').append('<br>Totalt: ' + (female_teams + male_teams + mix_teams));
}


function displayParticipants(participants)
{
  var male = 0;
  var female = 0;

  $.each(participants, function (i, participant)
  {
    var has_exercise = false;
    for (var i = 0; i < participant.exercises.length; ++i)
    {
      if (participant.exercises[i].exercise_id == exercise_id)
      {
        has_exercise = true;
        break;
      }
    }
  
    if (has_exercise && participant.status == REGISTRATION_CONFIRMED)
    {
      if (participant.person.gender == 'Male')
        male++;
      else if (participant.person.gender == 'Female')
        female++;

      var first_name = participant.person.first_name;
      var last_name = participant.person.last_name;
      var gender = customGenderFormat(participant.person.gender);
      var club = participant.club.club_name;

      var tablerow =
      '<tr> \
      <td><a href="./participant.php?entry_id=' + participant.entry_id +'">' + first_name + ' ' + last_name + '</a></td> \
      <td>' + club + '</td> \
      <td>' + gender + '</td> \
      </tr>';

      $('#participants').append(tablerow);
    }
  });

  $('#exercise-info').append('Damer: ' + female);
  $('#exercise-info').append('<br>Herrer: ' + male);
  $('#exercise-info').append('<br>Totalt: ' + (male + female));
}


function handleError(errorMsg)
{
}
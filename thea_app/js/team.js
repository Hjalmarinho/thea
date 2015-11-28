"use strict";

var event_id = sessionStorage.getItem("event_id");
var sport_id;
var selected_exercise_id;

$(document).ready(function()
{
  
  $('#updateTeam').click(function()
  {
    $('#approve-update').modal('show');
  });

  $('#cancelTeam').click(function()
  {
    $('#cancel-modal').modal('show');
  });

  apiGetClubs(displayClubs, handleError)
  apiGetSports(displaySports, handleError, event_id)
  apiGetTeam(displayTeam, handleError, event_id, local_team_id);
});

var local_team_id = GetURLParameter('team_id');
function displayClubs(clubs)
{
  if (clubs)
  {
    $.each(clubs, function(i, club)
    {
      $('#clubs').append('<option value=' + club.club_id + '>' + escapeHtml(club.club_name) + '</option>');
    });
  }
}

function displaySports(sports)
{
  if (sports)
  {
    $.each(sports, function(i, sport)
    {
      $('#sports').append('<option value=' + sport.sport_id + '>' + escapeHtml(sport.sport_description) + '</option>');
    });
  }
}

function displayTeamLeaderCandidates(member)
{
  if (member)
  {
    if (member.status == "CONFIRMED")
    {
      var memberName = member.person.first_name + ' ' + member.person.last_name;
      $('#teamleader').append('<option value=' + member.entry_id + '>'+ escapeHtml(memberName) + '</option>');
    }
  }
}

function displayExercises(exercises)
{
  if (exercises)
  {
    $.each(exercises, function(i, exercise)
    {
      $('#exercises').append('<option value=' + exercise.exercise_id + '>' + escapeHtml(exercise.exercise_description) + '</option>');
      if (exercise.exercise_id == selected_exercise_id)
      {
        setExercise(exercise);
      }
    });
  }
}

function setExercise(exercise)
{
  $('#exercises').dropdown('set selected', exercise.exercise_id);
}

function displayTeam(team)
{
  sport_id = team.exercise.sport_id;
  selected_exercise_id = team.exercise_id;
  var request = apiGetExercises(displayExercises, handleError, event_id, sport_id);

  $.when(request).done(function()
  {
    $("#teamLoader").hide();
  });

  var id_teamname = $('.teamname');
  var id_team_name = $('#team_name');
  var id_exercises = $('#exercises');
  var id_sports = $('#sports');
  var id_clubs = $('#clubs');
  var id_select_gender = $('#selectgender');
  var id_teamleader = $('#teamleader');
  var id_teammembers = $('#teammembers');
  var num_non_students = 0;
  var num_accreditated = 0;
  var num_members = 0;

  id_teamname.text(team.team_name);
  id_team_name.val(team.team_name);
  id_select_gender.dropdown('set selected', team.team_gender);
  id_clubs.dropdown('set selected', team.club_id);
  id_sports.dropdown('set selected', team.exercise.sport_id);

  if (team.team_members.length > 0)
  {
    for (var i = 0; i < team.team_members.length; ++i)
    {
      var teamMember = team.team_members[i];
      if (teamMember.status == "CONFIRMED")
      {
        var tablerow = '<tr><td><i class="red disabled remove icon"></td><td><a href="./participant.php?entry_id=' + teamMember.entry_id + '">' + teamMember.person.first_name + ' ' + teamMember.person.last_name + '</a></td></tr>';
        id_teammembers.append(tablerow);
        displayTeamLeaderCandidates(teamMember);
        num_members++;

        if (teamMember.is_student == false)
        {
          num_non_students++;
        }

        if (teamMember.accreditated == true)
        {
          num_accreditated++;
        }
      }
    }

    id_teammembers.append('<tr><td><i class="green disabled plus icon"></td><td></td></tr>');
  }
  
  if (team.contact_person.person.entry_id == 53)
  {
    displayTeamLeaderCandidates(team.contact_person)
  }

  id_teamleader.dropdown('set selected', team.contact_person_id);

  /* STATS */
  var team_slots = team.exercise.slots_per_team;
  var non_students = team.exercise.max_non_students_per_team;

  $('#team_info').append('Påmeldte: ' + num_members + ' / ' + team_slots + ' <br> \
            Ikke studenter: ' + num_non_students + ' / ' + non_students + ' <br> \
            Akkrediterte: ' + num_accreditated + ' / ' + team_slots);
}

function handleError(errorMsg)
{
}
"use strict";

var event_id = sessionStorage.getItem("event_id");
var team_id = GetURLParameter('team_id');
var current_team = null;
var changes_to_save = {};

$(document).ready(function()
{
  $('#updateTeam').click(function()
  {
    $('#approve-update').modal('show');
  });

  var getClubsRequest = apiGetClubs(displayClubs, handleError)
  var getSportsRequest = apiGetSports(displaySports, handleError, event_id)
  
  $('#exercises').dropdown();
  $.when(getSportsRequest, getClubsRequest).done(function()
  {
    loadTeam();
  });
});


function loadTeam()
{
  $("#teamLoader").show();
  var getTeamRequest = apiGetTeam(displayTeam, handleError, event_id, team_id);

  $.when(getTeamRequest).always(function()
  {
    changes_to_save = {};
    $("#teamLoader").hide();
  });
}


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
      var has_team_exercise = false;
      for (var j = 0; j < sport.exercises.length; ++j)
      {
        if (sport.exercises[j].is_teamexercise)
        {
          has_team_exercise = true;
          break;
        }
      }

      if (has_team_exercise)
        $('#sports').append('<option value=' + sport.sport_id + '>' + escapeHtml(sport.sport_description) + '</option>');
    });
  }
}

function displayExercises(exercises)
{
  if (exercises)
  {
    $('#exercises').empty();


    var selected_exercise = null;
    $.each(exercises, function(i, exercise)
    {
      if (exercise.is_teamexercise)
      {
        if (selected_exercise == null)
          selected_exercise = exercise;

        $('#exercises').append('<option selected value="' + exercise.exercise_id + '"">' + escapeHtml(exercise.exercise_description) + '</option>');
        if (exercise.exercise_id == current_team.exercise_id)
          selected_exercise = exercise;
      }
    });

    if (selected_exercise != null)
    {
      $('#exercises').dropdown('set selected', selected_exercise.exercise_id);
      $('#exercises').dropdown('set text', selected_exercise.exercise_description);
    }
  }
}

function exerciseChanged(sender)
{
  changes_to_save["exercise_id"] = parseInt($(sender).val());
}

function teamNameChanged(sender)
{
  changes_to_save["team_name"] = $(sender).val();
}

function clubChanged(sender)
{
  changes_to_save["club_id"] = parseInt($(sender).val());
}

function genderChanged(sender)
{
  changes_to_save["team_gender"] = $(sender).val();
}

function sportChanged(sender)
{
  // Clear selection first.
  var sportId = parseInt($(sender).val());

  $('#exercises').parent().addClass('loading');
  var request = apiGetExercises(displayExercises, handleError, event_id, sportId);
  $.when(request).done(function()
  {
    $('#exercises').parent().removeClass('loading');
  });
    changes_to_save["exercise_id"] = parseInt($(sender).val());

}


function displayTeam(team)
{
  current_team = team;

  var id_teamname = $('.teamname');
  var id_team_name = $('#team_name');
  var id_exercises = $('#exercises');
  var id_sports = $('#sports');
  var id_clubs = $('#clubs');
  var id_select_gender = $('#selectgender');
  var id_teammembers = $('#teammembers');
  var num_non_students = 0;
  var num_accreditated = 0;

  id_teamname.text(team.team_name);
  id_team_name.val(team.team_name);
  id_select_gender.dropdown('set selected', team.team_gender);
  id_clubs.dropdown('set selected', team.club_id);
  id_sports.dropdown('set selected', team.exercise.sport_id);

  id_teammembers.empty();
  //$('#teamleader').empty();
  var num_members = 0;
  if (team.team_members.length > 0)
  {
    for (var i = 0; i < team.team_members.length; ++i)
    {
      var roles = team.team_members[i].roles;
      var teamMember = team.team_members[i].entry;
      if (teamMember.status == 'CONFIRMED')
      {
        if (bit_test(roles, ROLE_PLAYER))
        {
          num_members++;
          if (!teamMember.is_student)
            num_non_students++;
        }

        var displayName = teamMember.person.first_name + ' ' + teamMember.person.last_name;
        var tablerow =
        '<tr entry-exercise-id="' + team.team_members[i].entry_exercise_id + '"> \
          <td> \
            <i class="red disabled remove icon"> \
          </td> \
          <td> \
            <a href="./participant.php?entry_id=' + teamMember.entry_id + '">' + displayName + '</a> \
          </td> \
          <td class="center aligned"> \
            <div class="inline field"> \
              <div class="ui checkbox"> \
                <input role="' + ROLE_PLAYER + '" onchange="roleChanged(this, ' + team.team_members[i].entry_exercise_id + ', ' + teamMember.entry_id + ');" type="checkbox" ' + (bit_test(roles, ROLE_PLAYER) ? 'checked' : '') + ' tabindex="0" class="hidden"> \
              </div> \
            </div> \
          </td> \
          <td class="center aligned"> \
            <div class="inline field"> \
              <div class="ui checkbox"> \
                <input role="' + ROLE_TEAMLEADER + '" onchange="roleChanged(this, ' + team.team_members[i].entry_exercise_id + ', ' + teamMember.entry_id + ');" type="checkbox" ' + (bit_test(roles, ROLE_TEAMLEADER) ? 'checked' : '') + ' tabindex="0" class="hidden"> \
              </div> \
            </div> \
          </td> \
          <td class="center aligned"> \
            <div class="inline field"> \
              <div class="ui checkbox"> \
                <input role="' + ROLE_CONTACTPERSON + '" onchange="roleChanged(this, ' + team.team_members[i].entry_exercise_id + ', ' + teamMember.entry_id + ');" type="checkbox" ' + (bit_test(roles, ROLE_CONTACTPERSON) ? 'checked' : '') + ' tabindex="0" class="hidden"> \
              </div> \
            </div> \
          </td> \
        </tr>';
        id_teammembers.append(tablerow);

        if (teamMember.accreditated)
          num_accreditated++;
      }
    }

    id_teammembers.append('<tr><td><i class="green disabled plus icon"></td><td></td><td colspan="3"></td></tr>');
  }

  /* STATS */
  var team_slots = team.exercise.slots_per_team;
  var non_students = team.exercise.max_non_students_per_team;

  $('#team_info').empty();
  $('#team_info').append('Deltagere: ' + num_members + ' / ' + team_slots + ' <br> \
            Ikke studenter: ' + num_non_students + ' / ' + non_students + ' <br> \
            Akkrediterte: ' + num_accreditated + ' / ' + team_slots);

  setCanceled();
  $('.ui.checkbox').checkbox();
}


function roleChanged(sender, entryExerciseId, entryId)
{
  $("#teamLoader").show();

  // Collect roles.
  var role = 0;
  $.each($('[entry-exercise-id=' + entryExerciseId + '] input'), function(i, input)
  {
    var index = $(input).attr('role');
    if ($(input).is(':checked'))
      role = bit_set(role, index)
  });

  var jsonData = {'roles' : role};
  var request = apiPutEntryExercise(function(data) { }, handleError, event_id, entryId, entryExerciseId, jsonData);
  $.when(request).always(function()
  {
    loadTeam();
  });
}


function handleError(errorMsg)
{
  $('#error-msg').text(errorMsg);
  $('#error-modal').modal('show');
}


function cancelTeam()
{
  $('#cancelTeam').addClass('loading');

  var data = null;
  if (current_team.status == REGISTRATION_CANCELLED)
    data = {'status': REGISTRATION_CONFIRMED};
  else
    data = {'status': REGISTRATION_CANCELLED};

  var request = apiPutTeam(function(data) {}, function(data) {}, event_id, team_id, data, '');
  $.when(request).done(function()
  {
    $('#cancelTeam').removeClass('loading');
    loadTeam();
  });
}


function updateTeam()
{
  $('#updateTeam').addClass('loading');

  var request = apiPutTeam(function(data) {}, handleError, event_id, team_id, changes_to_save, '');
  $.when(request).done(function()
  {
    $('#updateTeam').removeClass('loading');
    loadTeam();
  });
}


function setCanceled()
{
  if (current_team.status == REGISTRATION_CANCELLED)
  {
    $('#cancelTeam').text('Meld på igjen');
    $('#cancelTeam').removeClass("red").addClass("green");;
    $('.teamname').append(' <span style="color:#d01919;">(kansellert)</span>');
  }
  else
  {
    $('#cancelTeam').text('Kanseller laget');
    $('#cancelTeam').removeClass("green").addClass("red");;
  }
}
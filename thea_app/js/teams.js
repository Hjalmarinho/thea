"use strict";

var event_id = sessionStorage.getItem("event_id");

$(document).ready(function(){
  var request = apiGetAllTeams(displayTeams, handleError, event_id);
  $.when(request).always(function() { removeLoader(); });
})

function displayTeams(teams){
  //console.log(teams)
  var teamsdiv = ('#teams')
  $.each(teams, function (i, team){
    var cssClass = '';
    if (team.status == REGISTRATION_CANCELLED)
      cssClass = 'error';

    var contact_person = null;
    // Get the first contact person
    $.each(team.team_members, function (i, entryExercise) {
      if (bit_test(entryExercise.roles, ROLE_CONTACTPERSON))
      {
        contact_person = entryExercise.entry;
        return true;
      }
    });
    var team_name = team.team_name
    var club_name = team.club.club_name
    var team_gender = customGenderFormat(team.team_gender)
    var entry_id = (contact_person == null ? -1 : contact_person.entry_id);
    var contact_person_first_name = (contact_person == null ? '' : contact_person.person.first_name);
    var contact_person_last_name = (contact_person == null ? '' : contact_person.person.last_name);
    var team_id = team.team_id
    var club_id = team.club_id
    var tablerow =
    '<tr class="' + cssClass + '"> \
    <td><a href="./team.php?team_id=' + team_id +'">' + team_name + '</a></td> \
    <td>' + team.exercise.sport.sport_description + '</td> \
    <td><a href="./exercise.php?exercise_id=' + team.exercise.exercise_id +'">' + team.exercise.exercise_description + '</a></td> \
    <td>' + club_name + '</td> \
    <td>' + team_gender + '</td> \
    <td><a href="./participant.php?entry_id=' + entry_id +'">' + contact_person_first_name + " " + contact_person_last_name + '</a></td> \
    </tr>'
    $(teamsdiv).append(tablerow)
  });
}

function handleError(errorMsg) {
}

function removeLoader() {
  $("#teamsLoader").remove();
}
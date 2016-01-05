'use strict';

var eventId = sessionStorage.getItem('event_id');
var exerciseStats = [];
var last_entry_time = null;

$(document).ready(function()
{
  var request = apiGetSports(getSports, handleError, eventId);
});


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


function getSports(sports)
{
  for (var i = 0; i < sports.length; ++i)
  {
    var sport = sports[i];

    for (var j = 0; j < sport.exercises.length; j++)
    {
      var exercise = sport.exercises[j];
      var node = createExerciseStatsNode(sport, exercise);

      exerciseStats.push(node);
    }
  }
  fetchStatistics();
}


function fetchStatistics()
{
  var participantsRequest = apiGetParticipants(participants, handleError, eventId);
  var teamsRequest = apiGetAllTeams(teams, handleError, eventId);

  $.when(teamsRequest, participantsRequest).always(function()
    {
      removeLoader();

      sortArrayByString(exerciseStats, 'exercise_description');
      sortArrayByString(exerciseStats, 'sport_description');

      $('#exercisesBody').empty();
      for (var i = 0; i < exerciseStats.length; ++i)
      {
        var node = exerciseStats[i];
        var html = '<tr> \
          <td><a href="exercise.php?exercise_id=' + node.exercise_id + '">' + node.exercise_description + '</a></td> \
          <td>' + node.sport_description + '</td>';

        if (node.is_teamexercise)
        {
          html = html + '<td data-sort-value="' + node.male + '">' + node.male + ' (' + node.male_teams + ' lag) </td> \
          <td data-sort-value="' + node.female + '">' + node.female + ' (' + node.female_teams + ' lag) </td> \
          <td data-sort-value="' + node.mix_teams + '">' + node.mix_teams + ' lag</td> \
          <td data-sort-value="' + (node.male + node.female) + '">' + (node.male + node.female) + ' (' + (node.male_teams + node.female_teams + node.mix_teams) + ' lag) </td>';
        }
        else
        {
          html = html + '<td>' + node.male + '</td> \
          <td>' + node.female + '</td> \
          <td data-sort-value="0"> - </td> \
          <td>' + (node.male + node.female) + '</td>';
        }
        html = html + '</tr>';

        $('#exercisesBody').append(html);
      }
    }
  );
}


function teams(teams)
{
  if (teams)
  {
    var numTeams = 0;

    for (var i = 0; i < teams.length; ++i)
    {
      var team = teams[i];

      if (team.status == 'Confirmed')
      {
        numTeams++;
        addTeamToExerciseStats(team);
      }
    }

    $('#numTeams').html('<i class="users icon"></i>' + numTeams);
  }
}


function addParticipantToExerciseStats(participant)
{
  for (var i = 0; i < participant.exercises.length; ++i)
  {
    var entryExercise = participant.exercises[i];

    var node = findInArray(exerciseStats, 'exercise_id', entryExercise.exercise_id);
    if (participant.person.gender == "Male")
      node.male++;
    else if (participant.person.gender == "Female")
      node.female++;
  }
}


function createExerciseStatsNode(sport, exercise)
{
  var node = {
    'exercise_id': exercise.exercise_id,
    'sport_description': sport.sport_description,
    'exercise_description': exercise.exercise_description,
    'is_teamexercise': exercise.is_teamexercise,
    'male': 0,
    'female': 0,
    'male_teams': 0,
    'female_teams': 0,
    'mix_teams': 0
  };

  return node;
}


function addTeamToExerciseStats(team)
{
  var exercise = team.exercise;

  var node = findInArray(exerciseStats, 'exercise_id', exercise.exercise_id);
  if (team.team_gender == "Male")
    node.male_teams++;
  else if (team.team_gender == "Female")
    node.female_teams++;
  else if (team.team_gender == "Mix")
    node.mix_teams++;
}


function participants(participants)
{
  if (participants)
  {
    var numAccreditated = 0;
    var numFemale = 0;
    var numMale = 0;

    for (var i = 0; i < participants.length; ++i)
    {
      var participant = participants[i];

      if (participant.status == 'CONFIRMED')
      {
        if (participant.person.gender == "Male")
          numMale++;
        else if (participant.person.gender == "Female")
          numFemale++;

        if (participant.accreditated)
        {
          numAccreditated++;
        }

        addParticipantToExerciseStats(participant);

        var entryTime =  parseDateString(participant.time_registrated)
        if (last_entry_time == null || entryTime > last_entry_time)
          last_entry_time = entryTime;
      }
    }

    $('#numEntries').html('<i class="user icon"></i>' + (numMale + numFemale));
    $('#numFemale').html('<i class="woman icon"></i>' + numFemale);
    $('#numMale').html('<i class="man icon"></i>' + numMale);
    $('#numAccreditated').text(numAccreditated);

    lastEntryTimer();
  }
}


function handleError(errorMsg)
{
}


function removeLoader()
{
  $('#loader').hide();
}

'use strict';
var event_id = sessionStorage.getItem('event_id');
var last_history_id = -1;
var allParticipants = {};
var allExternalPersons = {};
var isCurrentExternalPerson = false;

$(document).ready(function()
{
  $('.ui.dropdown').dropdown();

  $('.special.cards .image').dimmer({
    on: 'hover'
  });

  var request = apiGetParticipants(displayParticipants, errorHandler, event_id, false, false, false, true, false, -1);
  var request2 = apiGetExternalPersons(displayExternalPersons, errorHandler, event_id, -1);

  $.when(request, request2).always(function() {
    initiateSearch();
    setTimeout("getUpdates()", 5000);

    removeParticipantsLoader();
  });
});

function printNumAccreditated(modifier)
{
  var total = 0;
  var accreditated = 0;

  for (var entryId in allParticipants)
  {
    var participant = allParticipants[entryId];
    total++;

    if (participant.accreditated)
      accreditated++;
  }


  for (var externalPersonId in allExternalPersons)
  {
    var externalPerson = allExternalPersons[externalPersonId];
    total++;

    if (externalPerson.accreditated)
      accreditated++;
  }

  accreditated += modifier;
  $('#num_accreditated').text(accreditated + ' av ' + total + ' er akkreditert.');
}

function participantMatch(participant, split)
{
  for (var i = 0; i < split.length; ++i)
  {
    if (participant.person.first_name.toLowerCase().indexOf(split[i]) == -1 && participant.person.last_name.toLowerCase().indexOf(split[i]) == -1)
    {
      return false;
    }
  }

  return true;
}

//Make participants table searchable
function initiateSearch()
{
  var $rows = $('#participants_table tbody tr');
  $('#search_input').keyup(function() {
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
    var split = val.split(' ');

    // Loop through all participants, and see if their name match the search text.
    for (var entryId in allParticipants)
    {
      var participant = allParticipants[entryId];
      var visible;
      if (val == '')
        visible = true;
      else
        visible = participantMatch(participant, split);

      if (visible != participant.__row_visible)
      {
        if (visible)
          $('#participant_' + participant.entry_id).show();
        else
          $('#participant_' + participant.entry_id).hide();
        participant.__row_visible = visible;
      }
    }

    for (var externalPersonId in allExternalPersons)
    {
      var externalPerson = allExternalPersons[externalPersonId];
      var visible;
      if (val == '')
        visible = true;
      else
        visible = participantMatch(externalPerson, split);

      if (visible != externalPerson.__row_visible)
      {
        if (visible)
          $('#externalperson_' + externalPerson.external_person_id).show();
        else
          $('#externalperson_' + externalPerson.external_person_id).hide();
        externalPerson.__row_visible = visible;
      }
    }
  });

  printNumAccreditated(0);
}

//      UPDATE GUI FUNCTIONS
// ***********************************************************************

//Populate table-body with all participants
function displayParticipants(participants)
{
  var participants_table_body = ('#participants_table_body');
  $.each(participants, function (i, participant)
  {
    if (participant.status == REGISTRATION_CONFIRMED)
    {
      var tablerow = $('<tr id="participant_'+ participant.entry_id + '" value="'+ participant.entry_id + '" onclick="participantClicked(' + participant.entry_id + ')">'+ 
        '<td>' + participant.person.first_name + '</td>'+
        '<td>' + participant.person.last_name + '</td>'+
        '<td>' + participant.club.club_name + '</td>'+
      '</tr>');

      //Display green check-icon if participant has been accreditated
      setBackgroundColor($(tablerow), participant.accreditated);

      participant.__row_visible = true;
      last_history_id = Math.max(last_history_id, participant.history_id);

      allParticipants[participant.entry_id] = participant;
      $(participants_table_body).append(tablerow);
    }
  });
};


function displayExternalPersons(externalPersons)
{
  var participants_table_body = ('#participants_table_body');
  $.each(externalPersons, function (i, externalPerson)
  {
    if (externalPerson.status == REGISTRATION_CONFIRMED)
    {
      var tablerow = $('<tr id="externalperson_'+ externalPerson.external_person_id + '" value="'+ externalPerson.external_person_id + '" onclick="externalPersonClicked(' + externalPerson.external_person_id + ')">'+ 
        '<td>' + externalPerson.person.first_name + '</td>'+
        '<td>' + externalPerson.person.last_name + '</td>'+
        '<td>Funksjonær</td>'+
      '</tr>');

      //Display green check-icon if externalPerson has been accreditated
      setBackgroundColor($(tablerow), externalPerson.accreditated);

      externalPerson.__row_visible = true;
      last_history_id = Math.max(last_history_id, externalPerson.history_id);

      allExternalPersons[externalPerson.external_person_id] = externalPerson;
      $(participants_table_body).append(tablerow);
    }
  });
};


function updateParticipants(participants)
{
  $.each(participants, function (i, participant)
  {
    allParticipants[participant.entry_id] = participant;
    setTableRowAccreditated('participant_' + participant.entry_id, participant.accreditated);
    last_history_id = Math.max(last_history_id, participant.history_id);
  });
}


function updateExternalPersons(externalPersons)
{
  $.each(externalPersons, function (i, externalPerson)
  {
    allExternalPersons[externalPerson.external_person_id] = externalPerson;
    setTableRowAccreditated('externalperson_' + externalPerson.external_person_id, externalPerson.accreditated);
    last_history_id = Math.max(last_history_id, externalPerson.history_id);
  });
}


function getUpdates()
{
  var request = apiGetParticipants(updateParticipants, errorHandler, event_id, false, false, false, true, false, last_history_id);
  var request2 = apiGetExternalPersons(updateExternalPersons, errorHandler, event_id, last_history_id);

  $.when(request, request2).always(function() {
    printNumAccreditated(0);    
    setTimeout("getUpdates()", 5000);
  });
}


// Display a participant on the card
function displayParticipant(participant)
{
  $('#participant_card').val(participant.entry_id);
  $('#card_name').text(participant.person.first_name+' '+participant.person.last_name);

  $('#description').empty();

  // Print club name
  $('#description').append('<b>Klubb</b>: ' + participant.club.club_name + ' <br>');

  // Print exercises
  $('#description').append('<b>Idretter</b>: ');

  var exercises = '';
  for (var i = 0; i < participant.exercises.length; ++i)
  {
    var exercise = participant.exercises[i].exercise;

    if (exercise.is_teamexercise)
    {
      var team = participant.exercises[i].team;
      exercises = exercises + exercise.exercise_description + ' (' + team.team_name + '), ';
    }
    else
    {
      exercises = exercises + exercise.exercise_description + ', ';
    }
  }
  $('#description').append(exercises.substr(0, exercises.length - 2) + '<br>');


  // Print additions
  $('#description').append('<b>Tillegg</b>: ');

  var additions = '';
  for (var i = 0; i < participant.additions.length; ++i)
  {
    var addition = participant.additions[i].addition;
    additions = additions + addition.addition_description + ', ';
  }
  $('#description').append(additions.substr(0, additions.length - 2) + '<br>');

  $('#description').append('<br><a href="participant.php?entry_id=' + participant.entry_id + '">Gå til full påmelding</a>');

  $('#card_img').attr('src', '');
  var request = apiGetPortrait(displayPortrait, errorHandler, event_id, participant.entry_id);
  $.when(request).always(function() { hideParticipantLoader(); });

  $('#card_time_registrated').text('Påmeldt ' + new Date(participant.time_registrated).customFormat("#DD#. #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#"));
  $('#card_comment').val(participant.comment);
  
  //Display green check-icon if participant has been accreditated
  displayAccreditated('participant_' + participant.entry_id, participant.accreditated);

  $('#participant_card').show();
};


function displayExternalPerson(externalPerson)
{
  $('#participant_card').val(externalPerson.external_person_id);
  $('#card_name').text(externalPerson.person.first_name+' '+externalPerson.person.last_name);

  $('#description').empty();

  // Print club name
  $('#description').append('<b>Organisasjon</b>: ' + externalPerson.organization + ' <br>');

  $('#description').append('<b>Rolle</b>: ' + externalPerson.description + ' <br>');

  $('#description').append('<br><a href="external.php?external_person_id=' + externalPerson.external_person_id + '">Gå til full påmelding</a>');

  $('#card_img').attr('src', '');
  var request = apiGetExternalPersonPortrait(displayPortrait, errorHandler, event_id, externalPerson.external_person_id)
  $.when(request).always(function() { hideParticipantLoader(); });

  //Display green check-icon if externalPerson has been accreditated
  displayAccreditated('externalperson_' + externalPerson.external_person_id, externalPerson.accreditated);

  $('#participant_card').show();
};


function displayPortrait(image)
{
  $('#card_portrait').attr('src', 'data:image/jpeg;base64,' + image.image_data)
}

//Callback function when a participant has been accreditated
function participantAccreditated(entry_id, accreditated)
{
  displayAccreditated('participant_' + entry_id, accreditated);
  printNumAccreditated((accreditated ? 1 : -1));
}

function externalPersonAccreditated(externalPersonId, accreditated)
{
  displayAccreditated('externalperson_' + externalPersonId, accreditated);
  printNumAccreditated((accreditated ? 1 : -1));
}

//Display green check-icon and accreditation-button dependent on whether the participant has been accreditated
function displayAccreditated(rowId, accreditated)
{
  if (accreditated)
  {
    $('#button_unaccreditate').show();
    $('#button_accreditate').hide();
    $('#card_accreditated_mark').show();
    setBackgroundColor($('#participant_card'), true);
  }
  else
  {
    $('#button_accreditate').show();
    $('#button_unaccreditate').hide();
    $('#card_accreditated_mark').hide();
    setBackgroundColor($('#participant_card'), false);
  }

  //Display in the table if participant is accreditated or not
  setTableRowAccreditated(rowId, accreditated);
}


function setTableRowAccreditated(rowId, accreditated)
{
  var row = $('#' + rowId);
  setBackgroundColor($(row), accreditated);
}


function displayCommentSaved(comment)
{
  // console.log(comment);
  $('#card_comment').hide();
  $('#comment_message').show();
  $('#comment_message').delay(1000).fadeOut();
  $('#card_comment').delay(1400).fadeIn();

}

function setBackgroundColor(div, accreditated)
{
  if(accreditated)
    div.css("background-color", "rgba(34, 190, 52, .2)");
  else
    div.css("background-color", "rgba(257, 257, 257, 1)");
}

//      POST/PUT/GET TO API FUNCTIONS
// ***********************************************************************

//Called when a participant in the table is clicked
function participantClicked(entry_id)
{
  isCurrentExternalPerson = false;
  if (entry_id)
  {
    $('#comment_div').show();
    $('#button_comment').show();

    //Get participant from API and display it's data in the participant_card
    showParticipantLoader();
    var request = apiGetParticipant(displayParticipant, errorHandler, event_id, entry_id);
  }
}

function externalPersonClicked(external_person_id)
{
  isCurrentExternalPerson = true;
  $('#comment_div').hide();
  $('#button_comment').hide();
  showParticipantLoader();
  var request = apiGetExternalPerson(displayExternalPerson, errorHandler, event_id, external_person_id);
}

function errorHandler(message)
{

}


//Accreditate participant by getting the entry_id from the value-attribute of the participant_card
function accreditateParticipant(accreditated)
{
  if (isCurrentExternalPerson)
  {
    var external_person_id = $( '#participant_card' ).val();
    var jsonData = {'accreditated': accreditated};

    var request = apiPutExternalPerson(function(data)
      {
        externalPersonAccreditated(external_person_id, accreditated);
      }, function(data) {}, event_id, external_person_id, jsonData, '');
  }
  else
  {
    var entry_id = $( '#participant_card' ).val();
    var jsonData = {'accreditated': accreditated};

    var request = apiPutParticipant(function(data)
      {
        participantAccreditated(entry_id, accreditated);
      }, function(data) {}, event_id, entry_id, jsonData, '');
  }

}

//Called when user clicks the "Lagre kommentar"-button
function saveComment()
{
  var entry_id = $( '#participant_card' ).val();
  var comment = $('#card_comment').val();
  var jsonData = {"comment": comment};

  // TODO: FIx callback
  // apiPutComment(entry_id, jsonData, displayCommentSaved);
  var request = apiPutParticipant(displayCommentSaved, function(data) {}, event_id, entry_id, jsonData, '');
}

function removeParticipantsLoader()
{
  $("#participantsLoader").remove();
}

function hideParticipantLoader()
{
  $('#participantLoader').hide();
}

function showParticipantLoader()
{
  $('#participantLoader').show();
}

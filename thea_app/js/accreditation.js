'use strict';
var event_id = sessionStorage.getItem('event_id');
var last_history_id = -1;
var visibleRows = [];

$(document).ready(function()
{
  $('.ui.dropdown').dropdown();

  $('.special.cards .image').dimmer({
    on: 'hover'
  });

  var request = apiGetParticipants(displayParticipants, errorHandler, event_id, false, false, false, true, false);

  $.when(request).always(function() { removeParticipantsLoader(); });
});

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
    for (var i = 0; i < visibleRows.length; ++i)
    {
      var participant = visibleRows[i];
      var visible;
      if (val == '')
        visible = true;
      else
        visible = participantMatch(participant, split);

      if (visible != participant.__row_visible)
      {
        if (visible)
          $('#' + participant.entry_id).show();
        else
          $('#' + participant.entry_id).hide();
        participant.__row_visible = visible;
      }
    }
  });
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
      var tablerow = $('<tr id="'+ participant.entry_id + '" value="'+ participant.entry_id + '" onclick="participantClicked(' + participant.entry_id + ')">'+ 
        '<td>' + participant.person.first_name + '</td>'+
        '<td>' + participant.person.last_name + '</td>'+
        '<td>' + participant.club.club_name + '</td>'+
      '</tr>');

      //Display green check-icon if participant has been accreditated
      setBackgroundColor($(tablerow), participant.accreditated);

      participant.__row_visible = true;
      visibleRows.push(participant);      
      $(participants_table_body).append(tablerow);
    }
  });

  initiateSearch();
};

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
  $('#description').append(additions.substr(0, additions.length - 2));

  //TODO: Print out additions

  $('#card_img').attr('src', '');
  var request = apiGetPortrait(displayPortrait, errorHandler, event_id, participant.entry_id);
  $.when(request).always(function() { hideParticipantLoader(); });

  $('#card_time_registrated').text('Påmeldt ' + new Date(participant.time_registrated).customFormat("#DD#. #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#"));
  $('#card_comment').val(participant.comment);
  
  //Display green check-icon if participant has been accreditated
  displayAccreditated(participant.entry_id, participant.accreditated);

  $('#participant_card').show();
};

function displayPortrait(image)
{
  $('#card_portrait').attr('src', 'data:image/jpeg;base64,' + image.image_data)
}

//Callback function when a participant has been accreditated
function participantAccreditated(entry_id, accreditated)
{
  displayAccreditated(entry_id, accreditated);
}

//Display green check-icon and accreditation-button dependent on whether the participant has been accreditated
function displayAccreditated(entry_id, accreditated)
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
  $('#participants_table tr').each(function()
  {
    var tr_value =  $(this).attr("value");
    if (tr_value == entry_id)
    {
      setBackgroundColor($(this), accreditated);
    }
  });
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
  if (entry_id)
  {
    //Get participant from API and display it's data in the participant_card
    showParticipantLoader();
    var request = apiGetParticipant(displayParticipant, errorHandler, event_id, entry_id);
  }
}

function errorHandler(message)
{

}


//Accreditate participant by getting the entry_id from the value-attribute of the participant_card
function accreditateParticipant(accreditated)
{
  var entry_id = $( '#participant_card' ).val();
  var jsonData = {'accreditated': accreditated};

  var request = apiPutParticipant(function(data)
    {
      participantAccreditated(entry_id, accreditated);
    }, function(data) {}, event_id, entry_id, jsonData, '');

  // TODO: FIx callback
  // apiPutAccreditation(entry_id, jsonData, participantAccreditated);
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
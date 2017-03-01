'use strict';
var event_id = sessionStorage.getItem('event_id');
var last_history_id = -1;
var isCurrentExternalPerson = false;
var table = null;

$(document).ready(function()
{
  $('.ui.dropdown').dropdown();

  $('.special.cards .image').dimmer({
    on: 'hover'
  });

  table = $('#participants_table').DataTable({
    'columns': [
      { 'data': 'first_name' },
      { 'data': 'last_name' },
      { 'data': 'club_name' },
      {
        'data': 'accreditated',
        'render': accreditated_column_render
      }
    ],
    'pagingType': 'numbers',
    'rowId': 'id',
    'info': false,
    'language':
    {
      'search': 'Søk',
      'lengthMenu': 'Vis _MENU_ deltagere',
      'paginate':
      {
        'first': 'Første',
        'last': 'Siste',
        'next': 'Neste',
        'previous': 'Forrige'
      }
    },
    'createdRow': function ( row, data, index )
    {
      if ( data.accreditated )
      {
        $(row).addClass('positive');
      }
    },
    'lengthMenu': [ [10, 25, 50, -1], [10, 25, 50, 'Alle'] ]

  });

  var request = apiGetParticipants(displayParticipants, errorHandler, event_id, false, false, false, true, false, -1);
  var request2 = apiGetExternalPersons(displayExternalPersons, errorHandler, event_id, -1);

  $.when(request).always(function() {
    table.draw();
    printNumAccreditated();
    $('#participants_table tbody').on( 'click', 'tr', function () {
      if ( $(this).hasClass('active') )
      {
        $(this).removeClass('active');
      }
      else
      {
        table.$('tr.active').removeClass('active');
        $(this).addClass('active');
      }
      row_clicked(this);
    });
    setTimeout("getUpdates()", 5000);

    removeParticipantsLoader();
  });
});


function accreditated_column_render( data, type, full, meta )
{
  if (type === 'display')
    return data ? '<i class="icon checkmark"></i>' : '';
  return data;
}

function printNumAccreditated()
{
  var total = table.rows().count();
  var accreditated = table.rows(function ( idx, data, node ) { return data.accreditated; }).count();

  $('#num_accreditated').text(accreditated + ' av ' + total + ' er akkreditert.');
}


//      UPDATE GUI FUNCTIONS
// ***********************************************************************

//Populate table-body with all participants
function displayParticipants(participants)
{
  var rows = [];
  for (var i = 0; i < participants.length; ++i)
  {
    if (participants[i].status != REGISTRATION_CONFIRMED)
      continue;
    var obj = {
      'first_name': participants[i].person.first_name,
      'last_name': participants[i].person.last_name,
      'club_name': participants[i].club.club_name,
      'id': '1-' + participants[i].entry_id,
      'accreditated': participants[i].accreditated
    }

    rows.push(obj);
    last_history_id = Math.max(last_history_id, participants[i].history_id);
  }

  table.rows.add(rows);
};


function displayExternalPersons(externalPersons)
{
  var rows = [];
  for (var i = 0; i < externalPersons.length; ++i)
  {
    if (externalPersons[i].status != REGISTRATION_CONFIRMED)
      continue;
    var obj = {
      'first_name': externalPersons[i].person.first_name,
      'last_name': externalPersons[i].person.last_name,
      'club_name': externalPersons[i].organization,
      'id': '2-' + externalPersons[i].external_person_id,
      'accreditated': externalPersons[i].accreditated
    }

    rows.push(obj);
    last_history_id = Math.max(last_history_id, externalPersons[i].history_id);
  }

  table.rows.add(rows);
};


function updateParticipants(participants)
{
  $.each(participants, function (i, participant)
  {
    var row_id = '1-' + participant.entry_id;
    table.row('#' + row_id).data().accreditated = participant.accreditated;
    table.row('#' + row_id).invalidate().draw();
    setTableRowAccreditated(row_id, participant.accreditated);
    last_history_id = Math.max(last_history_id, participant.history_id);
  });
}


function updateExternalPersons(externalPersons)
{
  $.each(externalPersons, function (i, externalPerson)
  {
    var row_id = '2-' + externalPerson.external_person_id;
    table.row('#' + row_id).data().accreditated = externalPerson.accreditated;
    table.row('#' + row_id).invalidate().draw();
    setTableRowAccreditated(row_id, externalPerson.accreditated);
    last_history_id = Math.max(last_history_id, externalPerson.history_id);
  });
}


function getUpdates()
{
  var request = apiGetParticipants(updateParticipants, errorHandler, event_id, false, false, false, true, false, last_history_id);
  var request2 = apiGetExternalPersons(updateExternalPersons, errorHandler, event_id, last_history_id);

  $.when(request, request2).always(function() {
    printNumAccreditated();
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
  displayAccreditated('1-' + participant.entry_id, participant.accreditated);

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
  displayAccreditated('2-' + externalPerson.external_person_id, externalPerson.accreditated);

  $('#participant_card').show();
};


function displayPortrait(image)
{
  $('#card_portrait').attr('src', 'data:' + image.mime_type + ';base64,' + image.image_data)
}

//Callback function when a participant has been accreditated
function participantAccreditated(entry_id, accreditated)
{
  var row_id = '1-' + entry_id;
  table.row('#' + row_id).data().accreditated = accreditated;
  table.row('#' + row_id).invalidate().draw();
  displayAccreditated(row_id, accreditated);
  printNumAccreditated();
}

function externalPersonAccreditated(externalPersonId, accreditated)
{
  var row_id = '2-' + externalPersonId;
  table.row('#' + row_id).data().accreditated = accreditated;
  table.row('#' + row_id).invalidate().draw();
  displayAccreditated(row_id, accreditated);
  printNumAccreditated();
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


function setTableRowAccreditated(row_id, accreditated)
{
  if (accreditated)
    $(table.row('#' + row_id).node()).addClass('positive')
  else
    $(table.row('#' + row_id).node()).removeClass('positive')
}


function displayCommentSaved(comment)
{
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

function row_clicked(sender)
{
  var prefix_id = $(sender).attr('id').substring(0, 1);
  var object_id = $(sender).attr('id').substring(2);
  showParticipantLoader();

  switch ($(sender).attr('id').substring(0, 1))
  {
    case '1':
      isCurrentExternalPerson = false;
      $('#comment_div').show();
      $('#button_comment').show();
      apiGetParticipant(displayParticipant, errorHandler, event_id, object_id);
      break;
    case '2':
      isCurrentExternalPerson = true;
      $('#comment_div').hide();
      $('#button_comment').hide();
      apiGetExternalPerson(displayExternalPerson, errorHandler, event_id, object_id);
      break;
  }
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

'use strict';

var event_id = sessionStorage.getItem('event_id');

$(document).ready(function() {
  var request = apiGetParticipantsSimplified(displayParticipants, handleError, event_id);
  $.when(request).always(function() { removeLoader(); });
});

function displayParticipants(participants) {
  sortArrayByNumberDesc(participants, 'entry_id');

  var numCancelled = 0;
  var numConfirmed = 0;

  $.each(participants, function (i, participant) {
    var cssClass = "";
    switch (participant.status) {
      case REGISTRATION_CONFIRMED:
        numConfirmed++;
        break;
      case REGISTRATION_CANCELLED:
        cssClass = "error";
        numCancelled++;
        break;
      default:
        return true;
    }

    var first_name = participant.first_name;
    var last_name = participant.last_name;
    var gender = customGenderFormat(participant.gender);
    var club = participant.club_name;
    var phone = participant.phone;
    var email = participant.email;
    var time_registrated = parseDateString(participant.time_registrated);
    var time_registrated_str = time_registrated.customFormat('#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#');
    var entry_id = participant.entry_id;
    var ticket_type = 'Ukjent';

    if (participant.ticket_type == 'PARTICIPANT')
      ticket_type = 'Deltaker';
    else if (participant.ticket_type == 'SPECTATOR')
      ticket_type = 'Tilskuer';

    var tablerow = '<tr class="' + cssClass + '">';

    tablerow = tablerow + '<td onclick="window.location.href =\'./participant.php?entry_id=' + entry_id + '\';" style="cursor:pointer;">';
    tablerow = tablerow + first_name;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + last_name;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + gender;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + club;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + phone;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + '<a href="mailto:' + email + '">' + email + '</a>';
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + ticket_type;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td data-sort-value="' + time_registrated.getTime() + '">';
    tablerow = tablerow + time_registrated_str;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td onclick="getReceipt(' + entry_id + ');">';
    tablerow = tablerow + '<i class="download blue icon"></i>';
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '</tr>';

    $('#participants').append(tablerow);
  });

  $('#summary').html(numConfirmed + ' påmeldte, ' + numCancelled + ' kansellerte.');
}

function removeLoader() {
  $('#participantsLoader').remove();
}

function handleError(errorMsg) {
  console.log(errorMsg);
}

function addNewParticipant() {
  var request = apiPostNewParticipant(function(data) {location.href = './participant.php?first=true&entry_id=' + data.entry_id;}, handleError, "", event_id);
}

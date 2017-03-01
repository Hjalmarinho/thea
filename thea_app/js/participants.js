'use strict';

var event_id = sessionStorage.getItem('event_id');

$(document).ready(function() {
  var request = apiGetParticipantsSimplified(displayParticipants, handleError, event_id);
  $.when(request).always(function() { removeLoader(); });
});


function gender_column_render( data, type, full, meta )
{
  return customGenderFormat(data);
}


function time_registered_column_render( data, type, full, meta )
{
  var date = parseDateString(data);
  if (type === 'sort')
    return date.getTime();
  else
    return date.customFormat('#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#');
}


function ticket_type_column_render(data, type, full, meta)
{
  switch (data)
  {
    case 'PARTICIPANT':
      return 'Deltaker';
    case 'SPECTATOR':
      return 'Tilskuer';
    default:
      return 'Ukjent';
  }
}


function receipt_column_render( data, type, full, meta )
{
  return '<i class="download blue icon"></i>';
}


function displayParticipants(participants)
{
  var table = $('table').DataTable({
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
      { 'data': 'gender', 'render': gender_column_render },
      { 'data': 'club_name' },
      { 'data': 'phone' },
      { 'data': 'email' },
      { 'data': 'ticket_type', 'render': ticket_type_column_render },
      { 'data': 'time_registrated', 'render': time_registered_column_render },
      {
        'data': null,
        'render': receipt_column_render,
        'createdCell': function (td, cellData, rowData, row, col)
        {
          $(td).attr('onclick', 'getReceipt(' + rowData.entry_id + ');');
          $(td).css('cursor', 'pointer');
          $(td).css('color', '#5b9aff');
        }
      }
    ],
    'order': [[7, 'desc']],
    'createdRow': function ( row, data, index )
    {
      switch (data.status)
      {
        case REGISTRATION_CANCELLED:
          $(row).addClass('error');
          break;
      }
    }
  }).rows.add(participants).draw();

  var num_confimed = table.rows(function ( idx, data, node ) { return data.status == REGISTRATION_CONFIRMED; }).count();
  var num_cancelled = table.rows(function ( idx, data, node ) { return data.status == REGISTRATION_CANCELLED; }).count();
  $('#summary').html(num_confimed + ' påmeldte, ' + num_cancelled + ' kansellerte.');
}


function removeLoader()
{
  $('#participantsLoader').remove();
}


function handleError(errorMsg)
{
  console.log(errorMsg);
}


function addNewParticipant()
{
  var request = apiPostNewParticipant(function(data) {location.href = './participant.php?first=true&entry_id=' + data.entry_id;}, handleError, '', event_id);
}
